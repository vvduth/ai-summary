import React from 'react'



const Loading = () => {
  return (
    <>
    <div className="flex flex-col items-center justify-center min-h-[300px] animate-pulse">
        <div className="w-40 h-6 bg-gray-300 rounded mb-6" />
        <div className="w-full max-w-xl space-y-4">
            <div className="h-4 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
            <div className="h-4 bg-gray-200 rounded w-2/3" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>
    </div>
    </>
  )
}

export default Loading