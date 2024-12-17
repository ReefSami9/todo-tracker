import NextAuth from "next-auth"

const handler = NextAuth({
      providers: [
            // OAuth authentication providers...
      ],
});

export { handler as GET, handler as POST }