import React from 'react'

const EmptySummariesState = () => {
  return (
    <div
        className="container grid grid-cols-1 gap-4 sm:gap-6
        md:grid-cols-2 lg:grid-cols-3 sm:px-0"
      >
        <div className="text-center col-span-full">
            <p className="text-lg font-medium text-gray-500">No summaries found</p>
        </div>
      </div>
  )
}

export default EmptySummariesState
