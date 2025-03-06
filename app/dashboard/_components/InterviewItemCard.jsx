'use client'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function InterviewItemCard({ interviewDetails }) {
  const router = useRouter()

  const onStart = () => {
    router.push(`/dashboard/myinterview/${interviewDetails?.mockid}`)
  }

  const onFeedback = () => {
    router.push(`/dashboard/myinterview/${interviewDetails?.mockid}/myfeedback`)
  }

  return (
    <div className='bg-[#121212] border border-[#7e22ce] shadow-md rounded-lg p-3'>
      <h2 className='font-extrabold text-lg text-white'>{interviewDetails?.jobTitle}</h2>
      <h2 className='font-bold text-sm text-white'>{interviewDetails?.jobExperience} - Years of Experience</h2>
      <h2 className='font-extrabold text-xs text-white'>Created At: {interviewDetails?.createdAt}</h2>

      <div className="flex justify-between mt-2 items-center gap-5">
        <Button
          onClick={onFeedback}
          size='sm'
          variant='outline'
          className='w-full font-extrabold border border-[#7e22ce] text-white bg-[#121212] hover:bg-[#8b5cf6]'
        >
          Feedback
        </Button>
        <Button
          onClick={onStart}
          size='sm'
          className='w-full font-extrabold border border-[#7e22ce] text-white bg-[#121212] hover:bg-[#8b5cf6]'
        >
          Start
        </Button>
      </div>
    </div>
  )
}
