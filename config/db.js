import mongoose from "mongoose";  // importing mongoose module


export const connectDB = async () => {        //  function for connecting to MongoDB database
	try {
		const conn = await mongoose.connect("mongodb+srv://sid229:sid123@cluster0.kzqhd.mongodb.net/event_db?retryWrites=true&w=majority&appName=Cluster0");
		console.log("MongoDB connected: " + conn.connection.host);
	} catch (error) {
		// console.error("Error connecting to MONGODB: " + error.message);
		process.exit(1); // 1 means there was an error, 0 means success
	}
};
