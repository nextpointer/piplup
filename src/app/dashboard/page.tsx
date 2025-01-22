import { HistoryCard } from '@/components/custom/HistoryCard';
import React from 'react'
import { quizData } from '@/lib/content';

const page = () => {
  return (
    <>
        <main >
            <div className='grid h-screen w-full grid-cols-3 grid-rows-3 pt-24'>
                <div className=' col-span-2'>
                    <h3 className='text-3xl font-bold '>
                        Hello Surajit👋🏻
                    </h3>
                </div>
                <div className=' row-span-2 col-span-2 text-2xl font-bold '>
                    {
                        quizData.map((data,key)=>(
                            <HistoryCard key={key} date={data.date} about={data.about} title={data.title} visibility={data.visibility}/>
                        ))
                    }
                </div>
                <div className=' bg-blue-300 row-start-1 row-span-3 col-start-3 text-2xl font-bold '>
                    Participation Section
                </div>
            </div>
        </main>
    </>
  )
}

export default page;