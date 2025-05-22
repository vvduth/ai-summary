import React from 'react'

const Loading = () => {
  return (
    <div className="raltive isolate min-h-screen">
      <div className="container mx-auto flex flex-col gap-4">
        <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
          <div className="flex flex-col">
            <div className="h-8 w-1/3 bg-slate-200 rounded animate-pulse mb-2" />
            <div className="h-5 w-1/4 bg-slate-100 rounded animate-pulse mb-4" />
            <div className="h-4 w-1/2 bg-slate-100 rounded animate-pulse" />
          </div>
          
          <div className="relative mt-4 sm:mt-8 lg:mt-16">
            <div
              className="relative p-4 sm:p-6 lg:p-8
              bg-white/80 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-xl 
              border border-sky-100/30 transition-all duration-300 hover:shadow-2xl
              hover:bg-white/90 max-w-4xl mx-auto"
            >
              <div
                className="absolute inset-0
                          bg-linear-to-brfrom-sky-50/50
                          via-orange-50
                          30 to-transparent opacity-50 rounded-2xl
                          sm:rounded-3xl"
              />

              <div
                className="absolute top-2 sm:top-4 right-2 sm:right-4 flex items-center gap-1.5
                            sm:gap-2 text-xs sm:text-sm
                            text-muted-foreground bg-white/90 px-2 sm:px-3
                            py-1 sm:py-1.5 rounded-full shadow-xs"
              >
                
              
              </div>

              <div className="relative mt-8 sm:mt-6 flex justify-center">
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loading