'use client';

import { useEffect, useState } from 'react';

interface Commit {
  hash: string;
  date: string;
  message: string;
}

type SubmoduleCommits = Record<string, Commit[]>;

export default function Commits() {
  const [commits, setCommits] = useState<SubmoduleCommits | null>(null);

  useEffect(() => {
    fetch('/repositories/apis/list')
      .then((res) => res.json())
      .then((data) => setCommits(data.commits))
      .catch((err) => console.error('Error fetching commits:', err));
  }, []);

  if (!commits) return <p>Loading...</p>;

  return (
    <div>
      <h1>Submodule Commits</h1>
      {Object.entries(commits).map(([submodule, logs]) => (
        <div key={submodule}>
          <h2>{submodule}</h2>
          <ul>
            {logs.map((commit, index) => (
              <li key={index}>
                <p>
                  <strong>Hash:</strong> {commit.hash}
                </p>
                <p>
                  <strong>Date:</strong> {commit.date}
                </p>
                <p>
                  <strong>Message:</strong> {commit.message}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
