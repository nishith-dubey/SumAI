'use client'
import BGGradient from '@/components/common/bg-gradient'
import UploadForm from '@/components/UploadForm'
import { ArrowRight, SparklesIcon } from 'lucide-react'
import React from 'react'

function page() {
  return (
    <div>
      <BGGradient className='from-emerald-500 via-teal-500 to-cyan-500
            opacity-15'/>
      <section className="flex justify-center">
      <div className="items-center flex flex-col gap-6 mt-20 max-w-[90vw] ">
        <div className="relative inline-block p-[1px] rounded-full bg-gradient-to-r from-rose-100 via-rose-500 to-rose-800 animate-gradient-x border-rose-100">
          <div className="rounded-full bg-white dark:bg-black px-4 py-2 flex gap-2 items-center text-rose-600">
            <SparklesIcon className="animate-pulse" />
            AI-Powered Content Creation
          </div>
        </div>

        <h1 className="text-center">
          Start Uploading{' '}
          <span className="relative inline-block">
            <span className="relative z-10 px-2">Your PDF's</span>
            <span className="bg-rose-200/50 absolute inset-0 -rotate-2 rounded-lg -skew-y-1 transform"></span>
          </span>
        </h1>
        <p className="text-gray-600 text-center text-2xl font-semibold">
          Upload your PDF and let our AI do the magic 🪄
        </p>

        
        <UploadForm/>
      </div>
    </section>
    </div>
  )
}

export default page