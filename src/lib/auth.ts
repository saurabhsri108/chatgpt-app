import { betterAuth } from "better-auth";
import Database from "better-sqlite3";
import { env } from "./env";

export const auth = betterAuth({
  database: new Database("./nextgpt.db"),
  socialProviders: {
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
  },
});
