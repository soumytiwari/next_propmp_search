import { Schema, model, models } from 'mongoose';

// create schema
const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already exists!'],
        required: [true, 'Email is required!'],
    },
    username: {
        type: String,
        required: [true, 'User is required!'],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
    },
    image: {
        type: String,
    }
});

// checks, if that user entry already exists, if it does.. it uses that user profile or info.. else it creates new
// this way we ensure not to again re-create the user-information
const User = model.User || model("User", UserSchema);
// this is because.. it is serverless and it is avoked and connection is made, only and everytime we call the function.

export default User;