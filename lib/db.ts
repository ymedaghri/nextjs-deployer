import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

type Data = {
  repositories: Array<{ name: string; description: string; clone_url: string }>;
};

const adapter = new JSONFile<Data>('db.json');
const db = new Low<Data>(adapter, {repositories: [
    {name:'events-api', description:'Fake events api repository to test the nextjs-deployer', clone_url:'https://github.com/ymedaghri/fake-events-api.git'},
    {name:'marketplace-app', description:'Fake Marketplace frontEnd App repository to test the nextjs-deployer', clone_url:'https://github.com/ymedaghri/fake-marketplace-app.git'},
    {name:'users-api', description:'Fake users api repository to test the nextjs-deployer', clone_url:'https://github.com/ymedaghri/fake-users-api.git'},
    {name:'guests-api', description:'Fake guests api repository to test the nextjs-deployer', clone_url:'https://github.com/ymedaghri/fake-guests-api.git'},    
]});

export { db };
