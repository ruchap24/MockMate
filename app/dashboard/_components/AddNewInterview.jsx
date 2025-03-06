'use client'
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { chatSession } from '@/utils/gemini'
import { LoaderCircle } from 'lucide-react'
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import axios from 'axios'

export default function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false)
  const [userdetails, setUserdetails] = useState({
    mockid: "",
    jobTitle: "",
    jobDesc: "",
    JobExperience: "",
    jsonResponse: "",
    createdBy: ""
  })
  const [loading, setLoading] = useState(false)
  const { user } = useUser()
  const router = useRouter();

  const onSubmit = async () => {
    setLoading(true)
    console.log(userdetails.jobTitle, userdetails.jobDesc, userdetails.JobExperience);

    const InputPromt = "Job Position: " + userdetails.jobTitle + ", Job Description: " + userdetails.jobDesc + ", Job Experience: " + userdetails.JobExperience + ", Depends on this information please give me " + process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT + " Interview question with expected answers in JSON format. Provide fields for Question and Answer."
    
    const result = await chatSession.sendMessage(InputPromt);
    const MockResponse = (result.response.text()).replace('```json', '').replace('\n```', '')
    
    console.log(MockResponse);
    const newId = uuidv4();
    userdetails.mockid = newId;
    userdetails.jsonResponse = MockResponse;
    userdetails.createdBy = user?.primaryEmailAddress?.emailAddress
    
    console.log(userdetails);
    console.log(userdetails.JobExperience);
    
    const response = await axios.post("/api/interviews/newinterview", userdetails)
    if (response) {
      console.log("SignUp Success!!");
      console.log(response.data.myUserId);
      router.push('/dashboard/myinterview/' + response.data.myUserId)
    } else {
      console.log("Response Error!!");
    }
    setLoading(false)
    setOpenDialog(false)
  }

  return (
    <div>
      <div 
        className='p-10 border rounded-lg text-white bg-purple-500 hover:scale-105 hover:shadow-md cursor-pointer text-xl font-bold hover:text-2xl text-center'
        onClick={() => setOpenDialog(true)}
      >
        + Add New
      </div>

      <Dialog open={openDialog}>
        <DialogContent className='max-w-2xl bg-black border border-purple-500'>
          <DialogHeader>
            <DialogTitle className='text-2xl text-white'>Tell Us More About Your Job Interview</DialogTitle>
            <DialogDescription className='text-white'>
              <span className='font-semibold text-white'>
                Add details about your Job Position/Role, Job Description & Year of Experience.
              </span>

              <span className='flex flex-col gap-1 text-purple-300 font-semibold my-3 mt-5'>
                <label className='text-base' htmlFor="">Job Role/Position:</label>
                <Input 
                  className='placeholder:text-xs bg-black text-white border border-purple-500 shadow-md'
                  placeholder="Ex. Full Stack Developer"
                  value={userdetails.jobTitle}
                  onChange={(e) => { setUserdetails({ ...userdetails, jobTitle: e.target.value }) }}
                />
              </span>

              <span className='flex flex-col gap-1 text-purple-300 font-semibold my-3 mt-5'>
                <label className='text-base' htmlFor="">Job Description/Tech Stack:</label>
                <Textarea 
                  className='placeholder:text-xs bg-black text-white border border-purple-500 shadow-md'
                  placeholder="Ex. React, Next JS, SQL..."
                  value={userdetails.jobDesc}
                  onChange={(e) => { setUserdetails({ ...userdetails, jobDesc: e.target.value }) }}
                />
              </span>

              <span className='flex flex-col gap-1 text-purple-300 font-semibold my-3 mt-5'>
                <label className='text-base' htmlFor="">Year of Experience:</label>
                <Input 
                  type='number'
                  className='placeholder:text-xs bg-black text-white border border-purple-500 shadow-md'
                  placeholder="Ex. 2"
                  value={userdetails.JobExperience}
                  onChange={(e) => { setUserdetails({ ...userdetails, JobExperience: e.target.value }) }}
                />
              </span>

              <span className='flex gap-5 justify-end items-center mt-7'>
                <Button 
                  className='font-bold border border-purple-500 text-white bg-black hover:bg-purple-500'
                  variant="outline" 
                  onClick={() => setOpenDialog(false)}
                >
                  Cancel
                </Button>

                <Button 
                  type='submit' 
                  disabled={loading} 
                  className='font-bold border border-purple-500 text-white bg-black hover:bg-purple-500'
                  onClick={onSubmit}
                >
                  {loading ?
                    <>
                      <LoaderCircle className='animate-spin' /> Generating From AI
                    </> : 'Start Interview'
                  }
                </Button>
              </span>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}