import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request) => {
    try{
        // console.log('lalala')
        await connectToDB();
        // now we have to filter out our prompts
        const prompts = await Prompt.find({}).populate('creator');                  //  fin({}) means, find all posts; .populate the creator to know who created it
        // console.log("prompts>>", prompts)
        
        return new Response(JSON.stringify(prompts), { status: 200 })
      } catch (error) {
        return new Response("Failed to fetch all the prompts", { status: 500 })
    }
}