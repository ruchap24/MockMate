import mongoose from "mongoose";

export async function connectDB() {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error('MONGODB_URI is not defined in environment variables');
        }

        console.log('Connecting to MongoDB with URI:', process.env.MONGO_URI); // Add this line

        const startTime = Date.now(); // Start time
        await mongoose.connect(process.env.MONGO_URI);
        const endTime = Date.now(); // End time

        console.log(`MongoDB connection established in ${endTime - startTime}ms`); // Log time taken

        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB Connected Successfully!');
        });

        connection.on('error', (err) => {
            console.log('MongoDB Connection Error:', err);
            process.exit(1);
        });

    } catch (error) {
        console.log('Failed to connect to MongoDB:', error);
        process.exit(1);
    }
}