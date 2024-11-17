import Link from 'next/link'
import React from 'react'
import DeleteRepositoryButton from './DeleteRepositoryButton';

interface Repository {
  name: string, description:string, clone_url:string
}

const RepositoriesPage = async () => {
    const res = await fetch('http://localhost:3000/api/repositories');
    const data: Repository[] = await res.json();

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
      
      <div className="my-regular-table">
        <div>    
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Uri</th>
              <th className='w-52'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((element, index) => (
              <tr key={`repository_${index}`}>
              <td>{element.name}</td>
              <td>{element.description}</td>
              <td>{element.clone_url}</td>
              <td className="space-x-2">
                <button className="my-action-button">
                  Edit
                </button>
                <DeleteRepositoryButton repoName={element.name}/>
              </td>
            </tr>
            ))}            
          </tbody>
        </table>
      </div>
    </div>
    </>
  )
}

export default RepositoriesPage