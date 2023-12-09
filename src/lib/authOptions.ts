import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { compare } from 'bcrypt';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import { db } from './db';

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/sign-in',
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text', placeholder: 'jsmith' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const existingUser = await db.user.findUnique({
                    where: {
                        email: credentials?.email,
                    },
                });

                if (!existingUser) {
                    return null;
                }

                if (existingUser.password) {
                    const passwordMatch = await compare(
                        credentials.password,
                        existingUser.password
                    );
                    if (!passwordMatch) {
                        return null;
                    }
                }

                return {
                    id: `${existingUser.id}`,
                    name: existingUser.name,
                    role: existingUser.role,
                    username: existingUser.username,
                    email: existingUser.email,
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            // console.log(token, user);
            if (user) {
                return {
                    ...token,
                    id: user.id,
                    username: user.username,
                    role: user.role,
                };
            }
            return token;
        },
        async session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    username: token.username,
                    role: token.role,
                },
            };
        },
    },
};
