import React from 'react'
import { Button } from '../ui/button'
import { Trash2 } from 'lucide-react'

const DeleteButton = () => {
  return (
   <Button variant={"ghost"}  size="icon" className='text-gray-400
   bg-gray-50 hover:text-sky-500'>
    <Trash2 className='w-4 h-4' />
   </Button>
  )
}

export default DeleteButton
