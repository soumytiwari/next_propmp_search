// to connec to the db
import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// how to create new route?-> export const (specify the route type, here, POST) async(req, res) => { // * right your code.. right here * // } 
export const POST = async(req) => {
    // grab the things we have passed through the post request
    const { userId, prompt, tag } = await req.json();

    try {
        await connectToDB();            //  after connecting, we wanna create a new prompt
        // create prompt
        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag
        })

        await newPrompt.save();                   // to save it to the database

        return new Response(JSON.stringify(newPrompt), { status: 201 })             //  201 means created
    } catch (error) {
        return new Response('Failed to create a new prompt', { status: 500 })       //  500 means server error
    }
}