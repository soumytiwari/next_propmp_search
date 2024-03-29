import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import User from "@models/user";
import { connectToDB } from "@utils/database";

// we're using google providers here..
const handler = NextAuth({
  // options objects
  providers: [
    //  array
    GoogleProvider({
      // clientId: '',
      // clientSecret: '',
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    // functions
    // here we gonna get user session
    async session({ session }) {
      // we want to be able to get the data about that user, every single time.. to keep an existing and running session
      const sessionUser = await User.findOne({
        email: session.user.email, //  so we're getting one from the session
      });

      // and update its id
      session.user.id = sessionUser._id.toString();

      return session;
    }, //  so we're updating it, making sure.. whihch user is currently online..
    // here we gonna get user profile
    async signIn({ profile }) {
      try {
        await connectToDB();

        // check if user already exists
        const userExists = await User.findOne({
          email: profile.email
        });

        // if not, create a new user
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }
        console.log('loggedIn-create/is');
        return true;
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        console.log('loggedIn-create-no');
        return false;
      }
    }
  }
})

// generally we do only either 'GET'/'POST' but in next authentication we do it this way
export { handler as GET, handler as POST };

// when working with nextauth handler, you have providers and then you have something known as, callbacks (object containing the callbacks), and then async functions containing the sessions and in sigin, we're supposed to go within it
