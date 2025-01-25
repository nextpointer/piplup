"use client"
import React from 'react'
import { result } from '@/app/store/atom'
import { useAtom } from 'jotai'

const page = () => {
    const [userResult] = useAtom(result)
    const correctResult  = userResult.filter((value)=>value===true)
    
  return (
    <>
        <main className='flex-col'>
            <h1 className='text-3xl'>Your Result</h1>
            <span className='text-2xl'>{correctResult.length}/{userResult.length}</span>
        </main>
    </>
  )
}

export default page