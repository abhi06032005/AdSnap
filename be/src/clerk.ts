import { Webhook } from "svix";
import type { Request, Response } from "express";
import { prisma } from "../configs/prisma.js";
import * as Sentry from "@sentry/node";
const webhookSecret = process.env.CLERK_WEBHOOK_SECRET!;

const clerkWebhooks = async (req: Request, res: Response) => {
  try {
    const payload = req.body; // raw buffer
    const headers = req.headers;

    const wh = new Webhook(webhookSecret);

    const evt: any = wh.verify(payload, {
      "svix-id": headers["svix-id"] as string,
      "svix-timestamp": headers["svix-timestamp"] as string,
      "svix-signature": headers["svix-signature"] as string,
    });

    const { data, type } = evt;

    switch (type) {
      case "user.created": {
        await prisma.user.create({
          data: {
            id: data.id,
            email: data?.email_addresses[0]?.email_address,
            name: `${data.first_name ?? ""} ${data.last_name ?? ""}`,
            image: data.image_url,
          },
        });
        break;
      }

      case "user.updated": {
        await prisma.user.update({
          where: { id: data.id },
          data: {
            email: data?.email_addresses[0]?.email_address,
            name: `${data.first_name ?? ""} ${data.last_name ?? ""}`,
            image: data.image_url,
          },
        });
        break;
      }

      case "user.deleted": {
        await prisma.user.deleteMany({
          where: { id: data.id },
        });
        break;
      }

      case "paymentAttempt.updated": {
        if (
          (data.charge_type === "recurring" ||
            data.charge_type === "checkout") &&
          data.status === "paid"
        ) {
          const credits = { pro: 80, premium: 250 } as any;

          const clerkUserId = data?.payer?.user_id;
          const planId = data.subscription_items?.[0]?.plan?.slug;

          if (!clerkUserId || !credits[planId]) break;

          await prisma.user.update({
            where: { id: clerkUserId },
            data: {
              credits: { increment: credits[planId] },
            },
          });
        }
        break;
      }
    }

    res.json({ message: `webhook received: ${type}` });
  } catch (err: any) {
    Sentry.captureException(err);
    console.error("Webhook error:", err.message);
    res.status(400).json({ message: "Invalid webhook" });
  }
};

export default clerkWebhooks;
