import { connectDB } from './dbConfig.js';
import mongoose from 'mongoose';

async function testConnection() {
    try {
        await connectDB();
        console.log('✅ Database connection test successful!');
        
        // Get database information
        const db = mongoose.connection.db;
        console.log('📊 Connected to database:', db.databaseName);
        
        // List all collections
        const collections = await db.listCollections().toArray();
        console.log('📁 Available collections:', collections.map(c => c.name));
        
        // Print connection details (useful for MongoDB Compass)
        console.log('🔗 Connection URI:', process.env.MONGODB_URI);
        
    } catch (error) {
        console.error('❌ Connection test failed:', error);
    } finally {
        await mongoose.disconnect();
        console.log('🔄 Connection closed');
    }
}

testConnection();