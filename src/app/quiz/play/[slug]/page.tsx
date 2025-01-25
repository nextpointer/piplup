import { Card } from '@/components/ui/card';
import React from 'react'
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const page = () => {
  return (
    <main className='flex-col xl:flex-row gap-4'>
        <Image src={"/readyQuiz.webp"} height={500} width={500} alt='Welcome' className='rounded-[24px] border'/>
        <Card className='p-4 flex-center flex-col gap-1'>
            <h2 className='text-2xl xl:text-3xl '>Ready for the Quiz?</h2>
            <p className='text-base'>Test yourself on this topic and learn infinite</p>
            <strong>Web Development - 10 Questions</strong>
            <Button className='mt-2 w-full'>Start Quiz</Button>
        </Card>
    </main>
  )
}


export default page;