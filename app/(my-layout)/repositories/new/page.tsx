import Link from 'next/link'
import React from 'react'

const NewRepositoryPage = () => {
  return (
    <div className='bg-slate-200 min-h-screen flex flex-col gap-10 items-center justify-center'>
        <p className='text-black text-4xl font-extrabold'>NewRepositoryPage</p>
        <Link href='/repositories' className="my-hero-button">
            Back to Repositories
        </Link>    
    </div>
  )
}

export default NewRepositoryPage