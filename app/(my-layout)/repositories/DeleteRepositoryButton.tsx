'use client';
import React from 'react'

interface DeleteRepositoryButtonProps {
  repoName: string,
  deleteAction: (repoName:string) => void,
}

const DeleteRepositoryButton = ({repoName, deleteAction}:DeleteRepositoryButtonProps) => {
  
  async function handleDelete() {
    const confirmed = confirm(`Are you sure you want to delete ${repoName}?`);
    if (!confirmed) return;

    await deleteAction(repoName);
  }
  
  return (
    <button className="my-destroy-button" onClick={handleDelete}>
      Delete
    </button>
  )
}

export default DeleteRepositoryButton