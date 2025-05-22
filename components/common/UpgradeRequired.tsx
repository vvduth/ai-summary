import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

const UpgradeRequired = () => {
  return (
    <div className='relative min-h-[50vh]'>
        <div className='absolute inset-0 flex items-center justify-center'>
            <div className='text-center'>
            <h1 className='text-2xl font-bold'>Upgrade Required</h1>
            <p className='mt-4'>You need to upgrade your plan to access this feature.</p>
            <Button asChild>
                <Link href={'/pricing'} className='mt-4'>
                View pricing plane</Link>
            </Button>
            </div>
        </div>
    </div>
  )
}

export default UpgradeRequired