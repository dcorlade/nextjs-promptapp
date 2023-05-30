import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import User from '@models/User';
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

            // check if user already exists, 
            const userExists = await User.findOne({ 
                email: profile.email 
            });

            // if not, create new user
            if (!userExists) {
                await User.create({
                    email: profile.email,
                    name: profile.name.replace(" ", "").toLowerCase(),
                    image: profile.picture
                });
            }


            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }
})

export { handler as GET, handler as POST }