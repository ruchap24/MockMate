import { connectDB } from "@/app/dbConfig/dbConfig";
import Interview from "@/app/models/InterviewModel";
import moment from 'moment/moment'

// Now I am connect with Database..
connectDB()

// Post Request method

export async function POST(request){
    const startTime = Date.now(); // Start time
    try {
        // Request body also take time as nextjs run in edge time
        const reqBody = await request.json();
        const {
            mockid,
            jobTitle,
            jobDesc,
            JobExperience,
            jsonResponse,
            createdBy
        } = reqBody;

        const ExistInterView = await Interview.findOne({mockid})
        if(ExistInterView){
            return Response.json({error : "InterView Already Exist!!"},{status: 400});
        }
        console.log(JobExperience);
        
        const newInterviewEntry = new Interview({
            mockid,
            jobTitle,
            jobDesc,
            jobExperience : JobExperience,
            jsonResponse,
            createdBy ,
            createdAt : moment().format('DD-MM-yyyy').toString()
        })
        
        console.log(newInterviewEntry.jobExperience);
        console.log(newInterviewEntry);
        
        const savedInterview = await newInterviewEntry.save()

        const endTime = Date.now(); // End time
        console.log(`POST request processed in ${endTime - startTime}ms`); // Log time taken

        return Response.json({
            message : "Successfull Save Information!!",
            success : true,
            myUserId : savedInterview.mockid
        })

    } catch (error) {
        return Response.json({error : error},{status:500})
    }
}