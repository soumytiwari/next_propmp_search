import { Schema, model, models } from "mongoose";

// the function, PromptSchema will have objects like creator, tag, prompt
const PromptSchema = new Schema({
    // specify creator of the specific prompt
    creator: {
        type: Schema.Types.ObjectId,            //  creator is going to be a document in a database, more specificaly the user type
        ref: 'User',                        //  (reference to the user)  one-to-many relationship, one user -> many prompt
    },
    prompt: {
        type: String,
        required: [true, 'Prompt is required.'],
    },
    tag: {
        type: String,
        required: [true, 'Tag is required.'],
    }
});

// either get the prompt that already exists on the models object (by saying models.prompt)
// or if it doesn't exist, create a new model that's going to be called prompt based on the Prompt Schema
const Prompt = models.Prompt || model('Prompt', PromptSchema);

export default Prompt;

// now our database knows how the document is gonna look like