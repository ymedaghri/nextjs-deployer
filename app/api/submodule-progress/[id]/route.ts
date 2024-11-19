import simpleGit from 'simple-git';
import path from 'path';
import fs from 'fs';
import { getDb } from '@/lib/db';
import { LOG_ACTIONS, SubmoduleStream } from './types';
  
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

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  
  const { id } = await params
  const db = await getDb(); 
  const release = db.data.releases.find((release) => release.id === id);
  const repositories = db.data.repositories;
 
  const repoPath = process.env.REPO_PATH!;
  const submodulesFile = path.join(repoPath, '.gitmodules');
  const submodules = parseGitModules(submodulesFile);
  
  const tickets = release?.tickets.map((ticket) => ticket.name) || [];

  const ticketsRegex = new RegExp(`^(${tickets.join('|')})`, 'i');

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
      async start(controller) {
        const sendProgress = (data:SubmoduleStream) => {
          controller.enqueue(encoder.encode(JSON.stringify(data)+'\n'));
        };
                  
        for (const submodule of submodules) {
            
          const repository = repositories.find((repo) => repo.name === submodule.name);
          if (!repository) {
            sendProgress({ submodule: submodule.name, message: `Repository not found for submodule ${submodule.name}`, action: LOG_ACTIONS.ERROR });
            continue;
          }
      
          const submoduleRepoPath = path.join(repoPath, submodule.path);
          const submoduleGit = simpleGit(submoduleRepoPath);
      
          try {
            await submoduleGit.checkout(repository.main_branch);
            sendProgress({ submodule: submodule.name, message: `Checked out to ${repository.main_branch}`, action: LOG_ACTIONS.CHECKOUT });
      
            await submoduleGit.pull('origin', repository.main_branch);
            sendProgress({ submodule: submodule.name, message: 'Pulled latest changes', action: LOG_ACTIONS.PULL });
      
            const log = await submoduleGit.log({ maxCount: 50 });
            const filteredCommits = log.all.filter((commit) => ticketsRegex.test(commit.message));
      
            sendProgress({
              submodule: submodule.name,
              commits: filteredCommits.map((commit) => ({
                hash: commit.hash,
                date: commit.date,
                message: commit.message,
              })
            ), action: LOG_ACTIONS.COMMITS
            });
          } catch (error) {
            sendProgress({ submodule: submodule.name, message: (error as {message:string}).message, action: LOG_ACTIONS.ERROR});
          }
        }
        sendProgress({ message: `All Submodules Done ✅`, action: LOG_ACTIONS.ALL_DONE });
      
        controller.close();
      }
    });

    const headers = new Headers({
      'Content-Type': 'text/plain; charset=utf-8',
      'Transfer-Encoding': 'chunked'
    });

    return new Response(stream, { headers });
}
