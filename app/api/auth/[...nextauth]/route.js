import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';

// we're using google providers here..
const handler = NextAuth({
    // options objects
    providers: [                    //  array
        GoogleProvider({
            // clientId: '',
            // clientSecret: '',
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],


    // functions
    // here we gonna get user session
    async session({ session }) {

    },
    // here we gonna get user profile
    async sigIn({ profile }) {
        try {
            // 
        } catch(error) {

        }
    }
})

// generally we do only either 'GET'/'POST' but in next authentication we do it this way
export { handler as GET, handler as POST };
