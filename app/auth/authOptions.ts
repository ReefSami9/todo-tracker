import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "@/prisma/client";
import { NextAuthOptions } from "next-auth";

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

export default authOptions;