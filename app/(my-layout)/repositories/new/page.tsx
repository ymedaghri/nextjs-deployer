import { getDb } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'

async function addRepository(formData: FormData) {
  "use server";
  const db = await getDb(); 
  const newRepository = { 
    name:formData.get('name') as string, 
    description:formData.get('description') as string,
    clone_url:formData.get('cloneUrl') as string
  };
  db.data.repositories.push(newRepository);  
  await db.write();  
  
  revalidatePath('/repositories');
  redirect('/repositories');
}

const NewRepositoryPage = () => {

  return (
    <>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Add a new repository</h2>
        
        <form className="space-y-4" action={addRepository}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Enter repository name"
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <input
              id="description"
              name="description"
              type="text"
              required
              placeholder="Enter repository description"
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />           
          </div>

          <div>
            <label htmlFor="cloneUrl" className="block text-sm font-medium text-gray-700 mb-1">
              Clone URL
            </label>
            <input
              id="cloneUrl"
              name="cloneUrl"
              type="url"
              required
              placeholder="Enter repository clone URL"
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="pt-4 flex justify-end space-x-4">
          <button
              type="submit"
              className="my-primary-button"
            >
              Save
            </button>
            <Link href="/repositories" className="my-destroy-button">
              Cancel
            </Link>
          </div>
        </form>
        </>
  );
}

export default NewRepositoryPage