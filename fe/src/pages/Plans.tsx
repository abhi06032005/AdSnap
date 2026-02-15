import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { useRef } from "react";
import Title from "../components/Title";
import { GhostButton, PrimaryButton } from "../components/Buttons";

type Plan = {
  name: string;
  price: string;
  credits: string;
  desc: string;
  features: string[];
  popular?: boolean;
};

type PlansProps = {
  plans: Plan[];
};

export default function Plans({ plans }: PlansProps) {
  const ref = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <section className="py-20 bg-white/3 border-t border-white/6">
      <div className="max-w-6xl mx-auto px-4">

        <Title
          title="Plans"
          heading="Choose the plan that fits you"
          description="Flexible pricing designed for individuals, teams and growing businesses."
        />

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              ref={(el) => {
                if (el) ref.current[i] = el;
              }}
              initial={{ y: 150, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 250,
                damping: 70,
                mass: 1,
                delay: 0.1 + i * 0.1,
              }}
              onAnimationComplete={() => {
                const card = ref.current[i];
                if (card) {
                  card.classList.add(
                    "transition",
                    "duration-500",
                    "hover:scale-102"
                  );
                }
              }}
              className={`relative p-6 rounded-xl border backdrop-blur ${
                plan.popular
                  ? "border-indigo-500/50 bg-indigo-900/30"
                  : "border-white/8 bg-indigo-950/30"
              }`}
            >
              {plan.popular && (
                <p className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-indigo-600 rounded-md text-xs">
                  Most popular
                </p>
              )}

              <div className="mb-6">
                <p className="font-medium">{plan.name}</p>
                <div className="flex items-end gap-3">
                  <span className="text-3xl font-extrabold">
                    {plan.price}
                  </span>
                  <span className="text-sm text-gray-400">
                    / {plan.credits}
                  </span>
                </div>
                <p className="text-sm text-gray-300 mt-2">
                  {plan.desc}
                </p>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feat, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-3 text-sm text-gray-300"
                  >
                    <Check className="w-4 h-4 text-indigo-400" />
                    {feat}
                  </li>
                ))}
              </ul>

              {plan.popular ? (
                <PrimaryButton className="w-full">
                  Get started
                </PrimaryButton>
              ) : (
                <GhostButton className="w-full justify-center">
                  Get started
                </GhostButton>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
