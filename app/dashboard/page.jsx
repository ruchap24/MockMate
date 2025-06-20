import React from 'react'
import AddNewInterview from './_components/AddNewInterview'
import InterviewList from './_components/InterviewList'

export default function Dashboard() {
  return (
    <div className='p-10'>
      <h1 className='font-extrabold text-primary text-3xl'>Dashboard</h1>
      <h2 className='text-gray-500 font-semibold'>Create and Start Your AI MockUp InterView With MockMate</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 my-5">
        <AddNewInterview/>
      </div>

      <InterviewList/>

    </div>
  )
}