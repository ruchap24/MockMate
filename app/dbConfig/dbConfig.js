import mongoose from "mongoose";

export async function connectDB() {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined in environment variables');
        }

        await mongoose.connect(process.env.MONGODB_URI);
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