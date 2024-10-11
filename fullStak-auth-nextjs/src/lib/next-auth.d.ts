import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  providers: [
    Providers.YourProvider({
      // Provider options
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          id: user.id,
          email: user.email,
          name: user.name,
        };
        // Add backend tokens if you have them
        token.backendTokens = {
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          expiresIn: user.expiresIn,
        };
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      session.backendTokens = token.backendTokens;
      return session;
    },
  },
  // Other NextAuth options
});
