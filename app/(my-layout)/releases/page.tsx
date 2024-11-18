import Waiting from '@/app/generic-components/Waiting'
import React, { Suspense } from 'react'
import ReleasesTable from './ReleasesTable'

const ReleasesPage = async () => {    
  return (
    <>         
      <div className="my-grid-panel">
        <h2 className="my-standard-text">Releases</h2>
      </div>
      <Suspense fallback={<Waiting/>}>
        <ReleasesTable/>
      </Suspense>      
    </>
  )
}

export default ReleasesPage