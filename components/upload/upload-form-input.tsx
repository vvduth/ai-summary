'use client'
import React from 'react'
import { Button } from '../ui/button'


interface Props {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}
const UploadFormInout = (
    {onSubmit}: Props
) => {
  return (
    
       <form className='flex flex-col gap-6'
      onSubmit={onSubmit}
      >
        <div className='flex justify-end items-center gap-1.5'>
        <input type="file"
        id='file'
        name='file'
        required
        className='file:mr-4 file:py-2 file:px-4 
        file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100'
        accept='application/pdf'
        aria-label="Select PDF file to upload" />
      
        <Button>
            Upload your masterpiece!
        </Button>
        </div>
      </form>
    
  )
}

export default UploadFormInout
