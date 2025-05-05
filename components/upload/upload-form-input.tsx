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
        className=''
        accept='application/pdf' />
        <Button>
            Upload your masterpiece!
        </Button>
        </div>
      </form>
    
  )
}

export default UploadFormInout
