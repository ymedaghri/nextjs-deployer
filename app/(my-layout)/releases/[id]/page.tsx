import Link from 'next/link';
import React from 'react'

interface ReleasesPageProps {
  params: { id: string };
  searchParams: { name?: string };
}

const ReleasesPage = async ({ searchParams }: ReleasesPageProps) => {    
  const { name } = searchParams;

  return (
    <>         
      <div className="my-grid-panel">
        <h2 className="my-standard-text">{name}</h2>
      </div>  
      <div className="pt-4 flex justify-end space-x-4">          
        <Link href="/releases" className="my-destroy-button disabled:bg-zinc-500">
            Go Back
        </Link>
      </div>    
    </>
  )
}

export default ReleasesPage