import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
// import { prompt } from "readline-sync";

export const GET = async (request, { params }) => {
    try{
        await connectToDB();
        // now we have to filter out our prompts
        const prompts = await Prompt.find({
            creator: params.id                  //  this is going to get us the posts from that specific creator
        }).populate('creator');                  //  fin({}) means, find all posts; .populate the creator to know who created it
        // console.log("prompts>>", prompts)
        // const prompts={shit: 'useless'};
        return new Response(JSON.stringify(prompts), { status: 201 })
    } catch (error) {
        return new Response("Failed to fetch all the prompts", { status: 500 })
    }
}

// like regular GET route + modified(to fetch the posts, only from the specific creator)
// those params get populated if you pass dynamic variables into the URL: session?.user.id
// here, dynamic is id, so.. we have access to, "params.id"