import { HistoryBar } from '@/lib/types'
import React from 'react'
import { Card } from '../ui/card'
import { Button } from '../ui/button'

export const HistoryCard = (params:HistoryBar) => {
  return (
    <>
        <Card className='flex flex-col m-4 p-4 rounded-[24px]'>
          {params.date}
          <div className='flex flex-row justify-between'>
            {params.title}
            <div>
              <Button>Edit</Button>
              <Button>Delete</Button>
            </div>
          </div>
          <div className='flex flex-row justify-between'>
            {params.about}
            <span className='p-3 bg-black text-white rounded-[24px] text-base'>{params.visibility}</span>
          </div>
        </Card>
    </>
  )
}
