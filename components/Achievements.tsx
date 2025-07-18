import React from 'react'

interface props{
    count: string,
    title: string,
}

const Achievements = ({count,title}: props) => {
  return (
    <div className='flex flex-col items-center justify-center gap-2'>
        <div className='font-bold text-2xl text-blue-500'>{count}</div>
        <div className='font-bold text-md text-gray-400'>{title}</div>
    </div>
  )
}

export default Achievements