import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "@/prisma/client";
import { NextAuthOptions } from "next-auth";
import { DefaultSession } from "next-auth";

const authOptions: NextAuthOptions = {
      secret: process.env.NEXTAUTH_SECRET,
      adapter: PrismaAdapter(prisma),
      providers: [
            GoogleProvider({
                  clientId: process.env.GOOGLE_CLIENT_ID!,
                  clientSecret: process.env.GOOGLE_CLIENT_SECRET!
            })
      ],
      session: {
            strategy: "jwt"
      },
      debug: true,
}

declare module "next-auth" {
      interface Session {
            user: {
                  id: string;
            } & DefaultSession["user"];
      }

      interface User {
            id: string;
      }
}

export default authOptions;