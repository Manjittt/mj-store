import mongoose from 'mongoose'
import colors  from 'colors'

// Function to connect to MongoDB
const connectDB =async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`connect to  mongodb database ${conn.connection.host}`)

    } catch (error) {
        console.log(`Error in mongodb ${error}`.bgRed.white);
    }

};
 
export default connectDB;