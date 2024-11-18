import Link from 'next/link'
import React, { Suspense } from 'react'
import RepositoriesTable from './RepositoriesTable';
import Waiting from './Waiting';

const RepositoriesPage = async () => {    
  return (
    <>         
      <div className="my-grid-panel">
        <h2 className="my-standard-text">Repositories</h2>
        <Link href={"/repositories/new"}>
        <button
          className="my-primary-button"
        >
          Add New
        </button></Link>
      </div>
      <Suspense fallback={<Waiting/>}>
        <RepositoriesTable />
      </Suspense>
    </>
  )
}

export default RepositoriesPage