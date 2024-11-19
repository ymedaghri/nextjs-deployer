import Link from 'next/link';
import React, { Suspense } from 'react'
import Waiting from '@/app/generic-components/Waiting';
import SubmoduleCommits from './SubmoduleCommits';

interface ReleasesPageProps {
  params: { id: string };
  searchParams: { name?: string };
}

const ReleasesPage = async ({ params, searchParams }: ReleasesPageProps) => {    
  const { id  } = params;
  const { name } = searchParams;
  return (
    <>         
      <div className="my-grid-panel">
        <h2 className="my-standard-text">{name}</h2>
      </div>
      <Suspense fallback={<Waiting/>}>
        <SubmoduleCommits release_id={id}/> 
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