import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import { ConnectToDatabase } from '@utils/database';

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
        })
    ],
    async session({ session }) {

    },
    async signIn({ profile }) {
        try {
            //route is serverless -> lambda that everytime it gets called, make connection to database
            await connectToDatabase();

            // check if user already exists, if not, create new user

            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }
})

export { handler as GET, handler as POST }