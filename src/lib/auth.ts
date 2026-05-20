import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";

const trustedOrigins = [
    "https://saarthidesk.vercel.app",
    "https://www.saarthidesk.com",
    "https://saarthidesk.com",
    "http://localhost:3000"
];

if (process.env.TRUSTED_ORIGINS) {
    const additional = process.env.TRUSTED_ORIGINS.split(",").map(o => o.trim());
    trustedOrigins.push(...additional);
}

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },
    trustedOrigins,
    advanced: {
        crossOriginCookies: { enabled: true },
        defaultCookieAttributes: {
            sameSite: "none",
            secure: true,
        }
    }
});
