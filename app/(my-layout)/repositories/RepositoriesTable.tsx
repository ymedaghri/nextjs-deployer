import { getDb } from '@/lib/db';
import React from 'react'
import DeleteRepositoryButton from './DeleteRepositoryButton';
import { revalidatePath } from 'next/cache';

async function deleteRepository(repoName: string) {
    "use server";
    const db = await getDb(); 
    db.data.repositories = db.data.repositories.filter((repository) => repository.name !== repoName);
    await db.write();
  
    revalidatePath('/repositories');
  }

const RepositoriesTable = async () => {
    const db = await getDb(); 
    const data = db.data.repositories;

  return (
    <div className="my-regular-table">
        <div>    
        <table>
        <thead>
            <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Uri</th>
            <th>Main branch</th>
            <th className='w-52'>Actions</th>
            </tr>
        </thead>
        <tbody>
            {data.map((element, index) => (
            <tr key={`repository_${index}`}>
            <td>{element.name}</td>
            <td>{element.description}</td>
            <td>{element.clone_url}</td>
            <td>{element.main_branch}</td>
            <td className="space-x-2">
                <button className="my-action-button">
                Edit
                </button>
                <DeleteRepositoryButton repoName={element.name} deleteAction={deleteRepository}/>
            </td>
            </tr>
            ))}            
        </tbody>
        </table>
    </div>
    </div>
  )
}

export default RepositoriesTable