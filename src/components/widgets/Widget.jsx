import React from 'react'
import '../../css/Widget.css'

export function NormalWidget({title, content, bg, classes}) {
  return (
    <div className={` text-left sm:text-center widget w-1/2 min-h-32 dark:bg-gray-800 bg-opacity-80 rounded-3xl ${classes}`} style={{backgroundColor: bg}}>
      <h1 className='font-semibold text-xl'>{title} </h1>
      <span className='flex flex-grow justify-center items-center'>
  <h1 className='font-bold text-2xl'>{content} </h1>
      </span>
    
        </div>
  )
}





  export function FullWidget({title, content, arrLength}) {
    return (
      <div className='widget w-full h-fit flex flex-col gap-5 py-5 '>
        <span className='flex justify-between items-center'>
           <h1 className='font-semibold text-2xl text-left'>{title} </h1>
           <h1 className='text-lg font-semibold text-green-800'>{arrLength}</h1>
        </span>
       

        <span className='flex flex-grow justify-center items-center'>
          {content}
        </span>
      
          </div>
    )
  }
