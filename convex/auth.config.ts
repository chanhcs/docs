import { AuthConfig } from "convex/server";

export default {
    providers: [
        {
            domain: "https://dynamic-alpaca-13.clerk.accounts.dev",
            applicationID: "convex",
        },
    ]
} satisfies AuthConfig;

