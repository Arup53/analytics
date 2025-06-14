import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/lib/prisma";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 365 * 2,
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        // Check if user already exists in database
        const existingUser = await prisma.user.findUnique({
          where: {
            email: user.email!,
          },
        });

        // If user doesn't exist, create a new user
        if (!existingUser) {
          await prisma.user.create({
            data: {
              email: user.email!,
              name: user.name || "",
              image: user.image || "",
            },
          });
          console.log(`New user created: ${user.email}`);
        } else {
          console.log(`Existing user signed in: ${user.email}`);
        }

        return true;
      } catch (error) {
        console.error("Error during sign in:", error);
        return false;
      }
    },
    async jwt({ token, user, account }) {
      // Add user ID to token if available
      if (user) {
        const dbUser = await prisma.user.findUnique({
          where: {
            email: user.email!,
          },
        });
        if (dbUser) {
          token.userId = dbUser.id;
        }
      }
      return token;
    },
    async session({ session, token }) {
      // Add user ID to session
      if (token.userId) {
        session.user.id = token.userId as string;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
