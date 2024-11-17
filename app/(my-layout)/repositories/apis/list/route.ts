import { simpleGit } from 'simple-git';
import path from 'path';
import fs from 'fs';
import { NextResponse } from 'next/server';

export async function GET() {
  const repoPath = process.env.REPO_PATH;

  if (!repoPath) {
    return NextResponse.json({ error: 'Repository path not defined in .env' }, { status: 500 });
  }

  try {
    // Read the submodule paths from .gitmodules
    const submodulesFile = path.join(repoPath, '.gitmodules');
    if (!fs.existsSync(submodulesFile)) {
      return NextResponse.json({ error: '.gitmodules file not found' }, { status: 404 });
    }

    const submodules = fs.readFileSync(submodulesFile, 'utf-8');
    const submodulePaths = submodules
      .split('\n')
      .filter((line) => line.startsWith('\tpath ='))
      .map((line) => line.replace('\tpath = ', '').trim());

    const commits: Record<string, { hash: string; date: string; message: string; }  []> = {};

    // Fetch the last 3 commits for each submodule
    for (const submodulePath of submodulePaths) {
      const submoduleRepoPath = path.join(repoPath, submodulePath);
      const submoduleGit = simpleGit(submoduleRepoPath);

      const log = await submoduleGit.log({ maxCount: 3 });
      commits[submodulePath] = log.all.map((commit) => ({
        hash: commit.hash,
        date: commit.date,
        message: commit.message,
      }));
    }

    return NextResponse.json({ commits });
  } catch (error) {
    console.error('Error fetching commits:', error);
    return NextResponse.json({ error: 'Error fetching commits' }, { status: 500 });
  }
}
