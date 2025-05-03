import { Pizza } from 'lucide-react'
import React from 'react'

const DemoSection = () => {
  return (
    <section className='relative'>
      <div className='py-12 lg:py-24 max-w-5xl mx-auto
      px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col items-center text-center'>
            <Pizza className='h-6 w-6 text-sky-600'/>
            <h3 className='font-bold text-3xl max-w-2xl mx-auto px-4 sm:px-6'>
                Watch how it works!
            </h3>
        </div>
      </div>
    </section>
  )
}

export default DemoSection
