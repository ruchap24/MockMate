import { connectDB } from "@/app/dbConfig/dbConfig";
import Interview from "@/app/models/InterviewModel";
import { NextResponse } from "next/server";

// Connect to the Database
connectDB();

export async function POST(request) {
  try {
    const myurl = request.url.split('/');
    const myId = myurl[myurl.length - 1];
    console.log(myId);

    const myInterview = await Interview.findOne({ mockid: myId });

    if (myInterview) {
      return NextResponse.json({
        message: "Successfully found Interview!!",
        success: true,
        myInterview: myInterview,
      });
    } else {
      return NextResponse.json(
        { error: "Interview Not Exist!!" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json({ error: error.message || error }, { status: 500 });
  }
}