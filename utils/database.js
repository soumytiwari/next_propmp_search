import mongoose from "mongoose";

let isConnected = false;    //  track the connection status

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);              //  set true to ignore warnings

    // check connection
    if(isConnected) {
        console.log('MongoDB is already connected');
        return;
    }

    // else create the connection
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            // options objects
            dbName: "share_prompt",
            useNewUrlParser: false,
            useUnifiedTopology: true,
        });

        isConnected = true;
        
        console.log('MongoDB connected')
    } catch (error) {
        console.log(error);
    }
}