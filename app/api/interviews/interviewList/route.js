import { connectDB } from "@/app/dbConfig/dbConfig";
import Interview from "@/app/models/InterviewModel";

// Now I am connect with Database..
connectDB()

// Post Request method

export async function POST(request){
    const startTime = Date.now(); // Start time
    try {
        const {createdBy} = await request.json();

        const ExistInterViewList = await Interview.find({createdBy})
        if(ExistInterViewList){
            const endTime = Date.now(); // End time
            console.log(`POST request processed in ${endTime - startTime}ms`); // Log time taken

            return Response.json({
                message : "Successfull Find Interview!!",
                success : true,
                InterViewList : ExistInterViewList
            })
        }
        else{
            return Response.json({error : "Failed to Fetch Interview Feedback Details"},{status:500})
        }

    } catch (error) {
        return Response.json({error : error},{status:500})
    }
}