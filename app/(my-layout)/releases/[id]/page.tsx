import Link from 'next/link';
import React, { Suspense } from 'react'
import Waiting from '@/app/generic-components/Waiting';
import SubmoduleCommits from './SubmoduleCommits';

interface ReleasesPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ name?: string, pull?: boolean }>;
}

const ReleasesPage = async ({ params, searchParams }: ReleasesPageProps) => {    
  const { id  } = await params;
  const { name, pull } = await searchParams;
  return (
    <>         
      <div className="my-grid-panel">
        <h2 className="my-standard-text">{name}</h2>
      </div>
      <Suspense fallback={<Waiting/>}>
        <SubmoduleCommits release_id={id} pull={pull}/> 
      </Suspense>        
      <div className="pt-4 flex justify-end space-x-4">          
        <Link href="/releases" className="my-destroy-button disabled:bg-zinc-500">
            Go Back
        </Link>
      </div>    
    </>
  )
}

export default ReleasesPage