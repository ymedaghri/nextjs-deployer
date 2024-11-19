'use client';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useFormStatus } from 'react-dom';

const NewRepositoryForm = () => {
  const { pending } = useFormStatus();
  const router = useRouter();

  return (
        <>
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
              disabled={pending}
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
              disabled={pending}
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
              disabled={pending}
            />
          </div>

          <div>
            <label htmlFor="cloneUrl" className="block text-sm font-medium text-gray-700 mb-1">
              Main branch
            </label>
            <input
              id="mainBranch"
              name="mainBranch"
              type="text"
              required
              placeholder="Enter repository Main branch"
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={pending}
            />
          </div>

          <div className="pt-4 flex justify-end space-x-4">
          <button
              type="submit"
              className="my-primary-button disabled:bg-zinc-500"
              disabled={pending}
            >
              Save
            </button>
            <button onClick={() => router.push('/repositories')} className="my-destroy-button disabled:bg-zinc-500" disabled={pending}>
              Cancel
            </button>
          </div>
        </>
  )
}

export default NewRepositoryForm