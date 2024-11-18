import { getDb } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import React from 'react'
import NewRepositoryForm from './form';

async function addRepository(formData: FormData) {
  "use server";
  await new Promise((resolve) => setTimeout(resolve, 3000));

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
        <NewRepositoryForm/>
        </form>
    </>
  );
}

export default NewRepositoryPage