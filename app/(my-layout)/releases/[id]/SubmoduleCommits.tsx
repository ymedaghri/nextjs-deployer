'use client';
import { Commit, LOG_ACTIONS, SubmoduleStream } from '@/app/api/submodule-progress/[id]/types';
import React, { useEffect, useRef, useState } from 'react'

interface SubmoduleCommitsProps {
  release_id: string;
}

const STYLE_INFO = 'text-green-300';
const STYLE_ACTION = 'text-yellow-300';
const STYLE_FINISHED = 'text-orange-300';
const STYLE_ERROR = 'text-red-300';

const SubmoduleCommits = ({release_id}:SubmoduleCommitsProps) => {
  const [submodules, setSubmodules] = useState<{name:string; commits:Commit[];}[]>([]);
  const [statusLogs, setStatusLogs] = useState<{message?:string; color:string}[]>([{message:'Loading ...', color:STYLE_INFO}]);

  useEffect(() => {
    const fetchStream = async () => {
      const response = await fetch(`/api/submodule-progress/${release_id}`);

      if (!response.body) {
        throw new Error('ReadableStream is not supported.');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      const processChunk = async () => {
        const { done, value } = await reader.read();
        if (done) return;

        buffer += decoder.decode(value); 
        const parts = buffer.split('\n');
        buffer = parts.pop() || '';

        parts.forEach((part) => {
          try {
            const message = JSON.parse(part) as SubmoduleStream;
            switch (message.action){
              case LOG_ACTIONS.COMMITS:
                if(message.commits!.length > 0) setSubmodules((prevSubmodules) => [...prevSubmodules, {name:message.submodule!, commits:message.commits!}]);
                break;
              case LOG_ACTIONS.ERROR:
                setStatusLogs((prevStatusLogs) => [...prevStatusLogs, {message:`Error : ${message.message}`, color:STYLE_ERROR}, {color:STYLE_ERROR}]);
                break;
              case LOG_ACTIONS.CHECKOUT:
                setStatusLogs((prevStatusLogs) => [...prevStatusLogs, {message:`> Submodule ${message.submodule} : ${message.message}`, color:STYLE_INFO}]);
                break;
              case LOG_ACTIONS.PULL:
                setStatusLogs((prevStatusLogs) => [...prevStatusLogs, {message:`> Submodule ${message.submodule} : ${message.message}`, color:STYLE_ACTION}, {color:STYLE_INFO}]);
                break;
              case LOG_ACTIONS.ALL_DONE:
              default:
                setStatusLogs((prevStatusLogs) => [...prevStatusLogs, { message: message.message!, color:STYLE_FINISHED}]);
                break;
            }           
          } catch (err) {
            setStatusLogs((prevStatusLogs) => [...prevStatusLogs, {message:`Error : An error occurred during json parsing : ${(err as {message:string}).message}`, color:STYLE_ERROR}]);
          }
        });

        await processChunk();
      };

      await processChunk();
    };

    fetchStream().catch(
      (err)=>{
        setStatusLogs((prevStatusLogs) => [...prevStatusLogs, {message:`Error : An error occurred during json parsing : ${(err as {message:string}).message}`, color:STYLE_ERROR}]);
      });
  }, [release_id]);


const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight; // Scroll to bottom
    }
  }, [statusLogs]); // Run whenever statusLogs updates


return (
    <div>
        <div className="space-y-6">
          <div
            className="h-40 bg-gray-800 rounded-md px-4 py-2 border border-gray-700 ">
              <div ref={scrollRef} className='h-36 pt-2 pb-1 overflow-y-auto'>
                {statusLogs.map((status, index)=> (<p className={`${status.color} min-h-[1rem]`} key={`status-log-${index}`}>{status.message}</p>))}
            </div>        
          </div>
        {submodules.map((submodule, index) => (
            <div key={submodule.name}
            className={`${index%2 ? 'bg-sky-100' : 'bg-blue-200'} shadow-md rounded-lg p-6 border border-gray-200`}>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">{submodule.name}</h2>
            <ul className="space-y-2">
                {submodule.commits.map((commit) => (
                <li key={commit.hash}
                className="text-gray-700 text-sm bg-gray-50 rounded-md px-4 py-2 border border-gray-200">
                    {commit.message} 
                    <span className="text-gray-500"> : {commit.hash}</span>
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