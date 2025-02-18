import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const res = await axios.post('http://localhost:4000/api/auth/login', {
            email: credentials.email,
            password: credentials.password,
          });

          if (res.data && res.data.token) {
            return { token: res.data.token, user: res.data.user };
          }
          return null;
        } catch (error) {
          throw new Error('Invalid email or password');
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
        token.user = user.user;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user = token.user;
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
});

export { handler as GET, handler as POST };
