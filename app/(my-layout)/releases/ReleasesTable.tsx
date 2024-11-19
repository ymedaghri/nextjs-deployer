import { getDb } from '@/lib/db';
import Link from 'next/link';
import React from 'react'

const ReleasesTable = async () => {
    const db = await getDb(); 
    const releases = db.data.releases;

  return (
    <div className="my-regular-table">
        <div>    
        <table>
        <thead>
            <tr>
            <th>Name</th>
            <th>Tickets</th>
            <th className='w-52'>Actions</th>
            </tr>
        </thead>
        <tbody>
            {releases.map((element, index) => (
            <tr key={`repository_${index}`}>
            <td>{element.name}</td>
            <td className='space-x-2'>
              { 
                element.tickets.map(
                   (ticket) => (<p key={ticket.name} className="my-badge inline-block">{ticket.name}</p>)
                )
              }
            </td>
            <td className="space-x-2">
                <Link href={`/releases/${element.id}?name=${element.name}`} className="my-action-button">
                Show Deps
                </Link>                
            </td>
            </tr>
            ))}            
        </tbody>
        </table>
    </div>
    </div>
  )
}

export default ReleasesTable