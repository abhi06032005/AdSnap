// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import Sentry from "@sentry/node";

Sentry.init({
    dsn: "https://963a91a9b0ea43a26a2ffef215dc6c1b@o4510902316040192.ingest.de.sentry.io/4510902322069584",
    // Setting this option to true will send default PII data to Sentry.
    // For example, automatic IP address collection on events
    sendDefaultPii: true,
});