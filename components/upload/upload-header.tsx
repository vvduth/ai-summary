import React from 'react'
import { Badge } from '../ui/badge'
import { Sparkles } from 'lucide-react'

const UploadHeader = () => {
  return (
    <div>
      <div
          className="flex flex-col items-center
            justify-center gap-6 text-center"
        >
          <div
            className="relative p-[1px] overflow-hidden
                rounded-full"
          >
            <Badge
              variant={"secondary"}
              className="relative px-6 py-2 text-base
                font-medium bg-white rounded-full transition-colors"
            >
              <Sparkles className="h-6 w-6 mr-2 text-sky-600 animate-pulse" />
              <p className="text-sky-600">AI-Powered Hustle</p>
            </Badge>
          </div>
          <div className="capitalize text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            <h1>Drop yo' PDFs, fam!</h1>
            <p>Slide in those PDFs and let the AI flex for you, dawg!</p>
          </div>
        </div>
    </div>
  )
}

export default UploadHeader
