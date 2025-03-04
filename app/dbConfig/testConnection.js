import { connectDB } from './dbConfig.js';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

// Get the current directory and project root
const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '../../');

// Set up environment file path
const envPath = resolve(projectRoot, '.env.local');
console.log('💡 Looking for .env.local at:', envPath);

// Load environment variables
dotenv.config({ path: envPath });

async function testConnection() {
    try {
        // Debug environment variable
        console.log('📂 Project Root:', projectRoot);
        console.log('📄 .env.local exists:', process.env.MONGO_URI ? 'Yes ✅' : 'No ❌');
        
        if (!process.env.MONGO_URI) {
            throw new Error('MONGODB_URI is not found in .env.local');
        }

        await connectDB();
        console.log('✅ Database connection test successful!');
        
        // Get database information
        const db = mongoose.connection.db;
        console.log('📊 Connected to database:', db.databaseName);
        
    } catch (error) {
        console.error('❌ Connection test failed:', error.message);
    } finally {
        if (mongoose.connection.readyState !== 0) {
            await mongoose.disconnect();
            console.log('🔄 Connection closed');
        }
    }
}

testConnection();