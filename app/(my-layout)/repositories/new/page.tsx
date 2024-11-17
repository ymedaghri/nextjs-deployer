'use client';
import Link from 'next/link';
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';

const NewRepositoryPage = () => {
  const router = useRouter();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [cloneUrl, setCloneUrl] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const response = await fetch('/api/repositories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description, cloneUrl }),
    });

    if (response.ok) {
      router.push('/repositories');
    }
  }

  return (
    <>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Add a new repository</h2>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
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
              onChange={(e) => setName(e.target.value)}
              value={name}
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
              onChange={(e) => setDescription(e.target.value)}
              value={description}
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
              onChange={(e) => setCloneUrl(e.target.value)}
              value={cloneUrl}
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