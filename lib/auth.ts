import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
	secret: process.env.NEXTAUTH_SECRET,
	providers: [
		CredentialsProvider({
		name: "Credentials",
		credentials: {
			email: { label: "Email", type: "email" },
			password: { label: "Password", type: "password" },
		},
		async authorize(credentials, req) {
      const res = await fetch(`${process.env.WEBSERVICE_URL}login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
		  "X-API-KEY": `${process.env.API_KEY}`,
        },
        body: JSON.stringify({
          email: credentials?.email,
          password: credentials?.password
        })
			});

			const user = await res.json();

			if (res.ok) {	
				return user;
			} else {
				return null;
			}
		},
		}),
	],
	callbacks: {
        // @ts-ignore
		async jwt({ token, user }) {
		  return { ...token, ...user };
		},
        // @ts-ignore
		async session({ session, token, user }) {
		  session.user = token;
		  return session;
		},
	},
	pages: {
		signIn: '/auth/signIn',
		error: '/auth/error'
	},
    session: {
        maxAge: 24 * 60 * 60
    }
};