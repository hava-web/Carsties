import NextAuth, { Profile } from 'next-auth';
import { OIDCConfig } from 'next-auth/providers';
import DuendeIDS6Provider from 'next-auth/providers/duende-identity-server6';
import Google from 'next-auth/providers/google';

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: 'jwt',
  },
  providers: [
    DuendeIDS6Provider({
      id: 'id-server',
      clientId: 'nextApp',
      clientSecret: 'secret',
      issuer: 'http://localhost:5001',
      authorization: { params: { scope: 'openid profile auctionApp' } },
      idToken: true,
    } as OIDCConfig<Omit<Profile, 'username'>>),
    Google({
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope: "openid profile email"
        },
      },
    })
  ],
  callbacks: {
    async jwt({ token, profile }) {
      if (profile) {
        token.username = profile.username;
      }
      return token;
    },
    async session({ session, token }) {
      console.log({ session, token });
      if (token) {
        session.user.username = token.name ?? ''
      }
      return session;
    }
  }
});
