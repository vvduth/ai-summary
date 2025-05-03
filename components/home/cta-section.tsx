import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { ArrowRight } from 'lucide-react'

const CtaSection = () => {
  return (
   <section className='py-12'>
    <div className='py-12 lg:py-24 max-w-5xl mx-auto
      px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col items-center justify-center space-y-4 text-center'>
            <div className='space-y-2'>
                <h2 className='text-3xl font-bold tracking-tighter
                sm:text-4xl md:text-5xl'> Are you ready to take your projects to the next level?</h2>
                <p className='mx-auto max-w-2xl text-gray-500 md:text-xl/relaxed '>
                    Join us and experience the power of AI-driven PDF summarization. 
                    Sign up now and start transforming your documents into concise summaries.
                </p>
            </div>
            <div className='flex flex-col gap-2 min-[400px]:flex-row justify-center'>
                <div>
                    <Button
                    size={'lg'}
                     className='w-full min-[400px]:w-auto bg-sky-500 
                     text-white hover:bg-sky-600 '
                    value={'link'}>
                    <Link href={"/#pricing"} className='flex items-center justify-center px-6 py-6'>
                    Get started right now! <ArrowRight className='animate-pulse ml-2 h-4 w-4'/>
                    </Link>
                    </Button>
                </div>
            </div>
        </div>
      </div>
   </section>
  )
}

export default CtaSection
