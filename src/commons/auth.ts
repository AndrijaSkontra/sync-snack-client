import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const res = await fetch(`${process.env.BACKEND_URL}/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        });
        if (!res.ok) {
          throw new Error("Login failed");
        }
        const token = await res.json();
        const user = await fetch(
          `${process.env.BACKEND_URL}/api/auth/fetchMe`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token?.accessToken}`,
            },
          },
        );

        if (!user.ok) {
          throw new Error("Fetch on user failed");
        }
        let returnUser = await user.json();
        returnUser.accessToken = token?.accessToken;
        return returnUser;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.user = user;
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token.user) {
        session.user = token.user;
      }
      if (token.accessToken) {
        session.accessToken = token.accessToken;
      }
      return session;
    },
    // async redirect({ url, baseUrl }) {
    //   // If the url is relative, prepend the baseUrl
    //   if (url.startsWith("/")) {
    //     return `${baseUrl}${url}`;
    //   }
    //   // If the url is already fully qualified, return it
    //   else if (new URL(url).origin === baseUrl) {
    //     return url;
    //   }
    //   // If the url is external, return the base url
    //   return baseUrl;
    // },
  },
  pages: {
    signIn: "/login",
  },
});
