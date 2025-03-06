'use client'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

function Header() {
  const path = usePathname()
  useEffect(() => {
    console.log(path)
  }, [path])
  
  return (
    <div className='flex p-4 justify-around bg-[#121212] shadow-md items-center'>
      <Image src={"/interviewAI.svg"} width={150} height={100} alt='Logo' />
      <ul className='hidden md:flex gap-5 items-center'>
        <Link href={'/dashboard'}>
          <li
            className={`cursor-pointer transition-all hover:text-[#7e22ce] ${
              path === '/dashboard' ? 'text-[#7e22ce] font-extrabold' : 'text-[#ffffff]'
            }`}
          >
            DashBoard
          </li>
        </Link>
        <Link href={'/dashboard/contact'}>
          <li
            className={`cursor-pointer transition-all hover:text-[#7e22ce] ${
              path === '/dashboard/contact' ? 'text-[#7e22ce] font-extrabold' : 'text-[#ffffff]'
            }`}
          >
            Contact Us
          </li>
        </Link>
        <Link href={'/dashboard/upgrade'}>
          <li
            className={`cursor-pointer transition-all hover:text-[#7e22ce] ${
              path === '/dashboard/upgrade' ? 'text-[#7e22ce] font-extrabold' : 'text-[#ffffff]'
            }`}
          >
            Upgrade
          </li>
        </Link>
      </ul>
      <UserButton />
    </div>
  )
}

export default Header