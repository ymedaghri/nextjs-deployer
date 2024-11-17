'use client';
import { useRouter } from 'next/navigation';
import React from 'react'

interface DeleteRepositoryButtonProps {
  repoName: string
}

const DeleteRepositoryButton = ({repoName}:DeleteRepositoryButtonProps) => {
  const router = useRouter();

  async function handleDelete() {
    const confirmed = confirm(`Are you sure you want to delete ${repoName}?`);
    if (!confirmed) return;

    const response = await fetch(`/api/repositories/${repoName}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      router.refresh();
    }
  }
  
  return (
    <button className="my-destroy-button" onClick={handleDelete}>
      Delete
    </button>
  )
}

export default DeleteRepositoryButton