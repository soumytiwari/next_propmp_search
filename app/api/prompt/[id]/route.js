import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// GET (read)
export const GET = async (request, { params }) => {
    try{
        await connectToDB();
        const prompt = await Prompt.findById(params.id).populate('creator');                  //  fin({}) means, find all posts; .populate the creator to know who created it
        
        if(!prompt) return new Response("Prompt not found", { status: 404 })
        return new Response(JSON.stringify(prompt), { status: 200 })
      } catch (error) {
        return new Response("Failed to fetch all the prompts", { status: 500 })
    }
}


//  PATCH (update)
export const PATCH = async(request, { params }) => {
    // get the parameters to update
    const { prompt, tag } = await request.json();

    try{
        await connectToDB();

        // find the existing parameters, nd we can pass the params.id: find the existing prmopt by id
        const existingPrompt = await Prompt.findById(params.id);

        if(!existingPrompt) return new Response("Prompt not found", { status: 404 });

        // update the prompt with new data
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt), { status: 200 })
    }  catch (error) {
        return new Response("Failed to update", { status: 500 })
    }
}

// DELETE (delete)
export const DELETE = async (request, { params }) => {
    try {
      await connectToDB();
  
      const deletedPrompt = await Prompt.deleteOne({ _id: params.id });
  
      if (deletedPrompt.deletedCount === 1) {
        return new Response("Prompt deleted successfully", { status: 200 });
      } else {
        return new Response("Prompt not found", { status: 404 });
      }
    } catch (error) {
      return new Response("Failed to delete prompt", { status: 500 });
    }
  };
  