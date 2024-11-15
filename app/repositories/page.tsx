import Link from 'next/link'
import React from 'react'

const RepositoriesPage = () => {
  return (
    <>
    <h1 className="my-title">Repositories Page</h1>
    <Link href='/repositories/new' className="my-button">
        Add New
    </Link>
    </>
  )
}

export default RepositoriesPage