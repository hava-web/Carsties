import NextAuth, { Profile } from 'next-auth';
import { OIDCConfig } from 'next-auth/providers';
import DuendeIDS6Provider from 'next-auth/providers/duende-identity-server6';
import Facebook from 'next-auth/providers/facebook';
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
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
          scope: 'openid profile email',
        },
      },
    }),
    Facebook({
      authorization: {
        params: {
          scope: 'email public_profile',
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth;
    },
    jwt: async ({ token, profile, account }) => {
      if (account && account.access_token) {
        token.accessToken = account.access_token
      }
      if (profile) {
        token.username = profile.username;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.username = token.username as string;
        session.accessToken = token.accessToken as string
      }
      return session;
    },
  },
});
