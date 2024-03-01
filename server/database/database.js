import mongoose from "mongoose";

mongoose.set('strictQuery', true);

const dbConnection = async() => {
    const url = `mongodb://localhost:27017/restaurant-app`; //make sure to add the db string
    try {
        /*
        Mongoose will emit 'disconnected' if it loses connectivity to 
         every server in the replica set, and 'connected' if it manages to 
         reconnect to at least one server in the replica set.
        */
        const connection = await mongoose.connect(url, 
            { useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");
    }
    catch (e) {
        console.log("Failed to connect database: ", e);
    }
};

export default dbConnection;
