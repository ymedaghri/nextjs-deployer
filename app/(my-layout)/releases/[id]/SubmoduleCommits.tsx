import React from 'react'
import path from 'path';
import simpleGit from 'simple-git';
import fs from 'fs';
import { getDb, Repository } from '@/lib/db';

interface SubmoduleCommitsProps {
    release_id: string;
    repositories: Repository
  }
  

type Submodule = {
    name: string;
    path: string;
};
  
  function parseGitModules(filePath: string): Submodule[] {
    const data = fs.readFileSync(filePath, 'utf-8');
    const submoduleRegex = /\[submodule "(.*?)"\]\s+path = (.+)/g;
    const submodules: Submodule[] = [];
    let match;
  
    while ((match = submoduleRegex.exec(data)) !== null) {
      const [, name, path] = match;
      submodules.push({ name, path });
    }
  
    return submodules;
  }

async function getSubmoduleCommits(tickets:string[], repositories:Repository[]): Promise<Record<string, { hash:string; date:string; message:string;}[]>> {
    const repoPath = process.env.REPO_PATH!;
    const submodulesFile = path.join(repoPath, '.gitmodules');      
    const submodules = parseGitModules(submodulesFile);
    
    const commits: Record<string, { hash: string; date: string; message: string; }  []> = {};
  
    const ticketsRegex = new RegExp(`^(${tickets.join('|')})`, 'i');

    for (const submodule of submodules) {
        const repository = repositories.find((repo) => repo.name === submodule.name);
        if (!repository) {
            throw new Error(`Repository not found for submodule ${submodule.name}`);
        }
        const submoduleRepoPath = path.join(repoPath, submodule.path);
        const submoduleGit = simpleGit(submoduleRepoPath);
        console.log(`Processing submodule ${submodule.name}`);
        await submoduleGit.checkout(repository.main_branch);
        console.log(`submodule ${submodule.name} checked out to ${repository.main_branch}.`);
        await submoduleGit.pull('origin', repository.main_branch);
        console.log(`submodule ${submodule.name} pulled latest changes. Checking commits for tickets.`);
        
        const log = await submoduleGit.log({ maxCount: 50 });
        
        const filteredCommits = log.all.filter((commit) => ticketsRegex.test(commit.message));

        if (filteredCommits.length > 0) {
            commits[submodule.name] = filteredCommits.map((commit) => ({
            hash: commit.hash,
            date: commit.date,
            message: commit.message,
            }));
        }
    }

    return commits;
  }
const SubmoduleCommits = async ({release_id}:SubmoduleCommitsProps) => {
    const db = await getDb(); 
    const release = db.data.releases.find((release) => release.id === release_id);
    const repositories = db.data.repositories;
    const commits = await getSubmoduleCommits(release?.tickets.map((ticket) => ticket.name) || []  , repositories);

  
  return (
    <div>
        <div className="space-y-6">
        {Object.entries(commits).map(([submodule, commits]) => (
            <div key={submodule}
            className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">{submodule}</h2>
            <ul className="space-y-2">
                {commits.map((element) => (
                <li key={element.hash}
                className="text-gray-700 text-sm bg-gray-50 rounded-md px-4 py-2 border border-gray-200">
                    {element.message} 
                    <span className="text-gray-500"> : {element.hash}</span>
                </li>
                ))}
            </ul>
            </div>
        ))}
        </div>
    </div>
  )
}

export default SubmoduleCommits