import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getCsrfToken } from "next-auth/react";
import { SiweMessage } from "siwe";

export function getAuthOptions(req) {
  const providers = [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const siwe = new SiweMessage(
            JSON.parse(
              (credentials === null || credentials === void 0
                ? void 0
                : credentials.message) || "{}"
            )
          );
          const nextAuthUrl =
            process.env.NEXTAUTH_URL ||
            (process.env.VERCEL_URL
              ? `https://${process.env.VERCEL_URL}`
              : null);
          if (!nextAuthUrl) {
            return null;
          }
          const nextAuthHost = new URL(nextAuthUrl).host;
          if (siwe.domain !== nextAuthHost) {
            return null;
          }
          if (siwe.nonce !== (await getCsrfToken({ req }))) {
            return null;
          }
          await siwe.validate(
            (credentials === null || credentials === void 0
              ? void 0
              : credentials.signature) || ""
          );
          return {
            id: siwe.address,
          };
        } catch (e) {
          return null;
        }
      },
      credentials: {
        message: {
          label: "Message",
          placeholder: "0x0",
          type: "text",
        },
        signature: {
          label: "Signature",
          placeholder: "0x0",
          type: "text",
        },
      },
      name: "Ethereum",
    }),
  ];
  return {
    callbacks: {
      async jwt({ token }) {
        const { oauth_token_secret } = req.query;
        if (oauth_token_secret) {
          token.oauth_token_secret = oauth_token_secret;
        }
        return token;
      },
      async session({ session, token }) {
        session.address = token.sub;
        session.user = {
          name: token.sub,
        };
        session.oauth_token_secret = token.oauth_token_secret || null;
        return session;
      },
    },
    providers,
    secret: process.env.NEXTAUTH_SECRET,
    session: {
      strategy: "jwt",
    },
  };
}
// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default async function auth(req, res) {
  const authOptions = getAuthOptions(req);
  if (!Array.isArray(req.query.nextauth)) {
    res.status(400).send("Bad request");
    return;
  }
  const isDefaultSigninPage =
    req.method === "GET" &&
    req.query.nextauth.find((value) => value === "signin");
  // Hide Sign-In with Ethereum from default sign page
  if (isDefaultSigninPage) {
    authOptions.providers.pop();
  }
  return await NextAuth(req, res, authOptions);
}
