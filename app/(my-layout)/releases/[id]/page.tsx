import Link from 'next/link';
import path from 'path';
import React from 'react'
import simpleGit from 'simple-git';
import fs from 'fs';
import { getDb } from '@/lib/db';

interface ReleasesPageProps {
  params: { id: string };
  searchParams: { name?: string };
}

async function getSubmoduleCommits(tickets:string[]): Promise<Record<string, { hash:string; date:string; message:string;}[]>> {
  const repoPath = process.env.REPO_PATH!;
  const submodulesFile = path.join(repoPath, '.gitmodules');
  
  const submodules = fs.readFileSync(submodulesFile, 'utf-8');
  const submodulePaths = submodules
      .split('\n')
      .filter((line) => line.startsWith('\tpath ='))
      .map((line) => line.replace('\tpath = ', '').trim());

    const commits: Record<string, { hash: string; date: string; message: string; }  []> = {};

    const ticketsRegex = new RegExp(`^(${tickets.join('|')})`, 'i');

    for (const submodulePath of submodulePaths) {
      const submoduleRepoPath = path.join(repoPath, submodulePath);
      const submoduleGit = simpleGit(submoduleRepoPath);

      const log = await submoduleGit.log({ maxCount: 500 });
      
      const filteredCommits = log.all.filter((commit) => ticketsRegex.test(commit.message));

      if (filteredCommits.length > 0) {
        commits[submodulePath] = filteredCommits.map((commit) => ({
          hash: commit.hash,
          date: commit.date,
          message: commit.message,
        }));
      }
    }

    return commits;
}

const ReleasesPage = async ({ params, searchParams }: ReleasesPageProps) => {    
  const { id  } = params;
  const { name } = searchParams;
  const db = await getDb(); 
  const release = db.data.releases.find((release) => release.id === id);
  
  const commits = await getSubmoduleCommits(release?.tickets.map((ticket) => ticket.name) || []  );

  return (
    <>         
      <div className="my-grid-panel">
        <h2 className="my-standard-text">{name}</h2>
      </div>
      <div>
        <div className="space-y-6">
      {Object.entries(commits).map(([submodule, commits]) => (
        <div
          key={submodule}
          className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-4">{submodule}</h2>
          
          <ul className="space-y-2">
            {commits.map((element) => (
              <li
                key={element.hash}
                className="text-gray-700 text-sm bg-gray-50 rounded-md px-4 py-2 border border-gray-200"
              >
                {element.message} 
                <span className="text-gray-500"> : {element.hash}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    </div>  
      <div className="pt-4 flex justify-end space-x-4">          
        <Link href="/releases" className="my-destroy-button disabled:bg-zinc-500">
            Go Back
        </Link>
      </div>    
    </>
  )
}

export default ReleasesPage