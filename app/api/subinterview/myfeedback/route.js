import { connectDB } from "@/app/dbConfig/dbConfig";
import FeedBack from "../../../models/InterviewQuestionAnswerFeedbackModel";

// Now I am connect with Database..
connectDB()

// Post Request method

export async function POST(request){
    try {
        const {mockidRef, feedbackData} = await request.json();
        let feedback = await FeedBack.findOne({mockidRef});
        if(feedback){
            return new Response(JSON.stringify({
                message : "Feedback already exists!",
                success : true,
                feedbackResult : feedback
            }), {status: 200});
        } else {
            feedback = new FeedBack({mockidRef, ...feedbackData});
            await feedback.save();
            return new Response(JSON.stringify({
                message : "Successfully added feedback!",
                success : true,
                feedbackResult : feedback
            }), {status: 201});
        }
    } catch (error) {
        return new Response(JSON.stringify({error : error.message}), {status: 500});
    }
}