import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

type ticket = {
  name: string;
  description: string;
};

export type Repository = {
  name: string;
  description: string;
  clone_url: string;
  main_branch: string;
}

type Data = {
  repositories: Array<Repository>;
  releases: Array<{ id:string; name: string; tickets: ticket[];}>;
};

const adapter = new JSONFile<Data>('db.json');
const db = new Low<Data>(adapter, {
  repositories: [
    {name:"db", description:"db", clone_url:"https://github.com/kering-technologies/crm-evt_mgt-db_mgt.git", main_branch:"main"},
    {name:"apis/users", description:"users", clone_url:"https://github.com/kering-technologies/crm-evt_mgt-users_api-service.git", main_branch:"develop"},
    {name:"apis/journeys", description:"journeys", clone_url:"https://github.com/kering-technologies/crm-evt_mgt-journeys_api-service.git", main_branch:"develop"},
    {name:"apis/guests", description:"guests", clone_url:"https://github.com/kering-technologies/crm-evt_mgt-guests_api-service.git", main_branch:"develop"},
    {name:"flows/orchestrator", description:"flow-orchestrator", clone_url:"https://github.com/kering-technologies/crm-evt_mgt-flow-orchestrator.git", main_branch:"develop"},
    {name:"apis/events", description:"events", clone_url:"https://github.com/kering-technologies/crm-evt_mgt-events_api-service.git", main_branch:"develop"},
    {name:"ops", description:"ops", clone_url:"https://github.com/kering-technologies/dso-crm-evt_mgt-ops.git", main_branch:"main"},
    {name:"apis/assets", description:"assets", clone_url:"https://github.com/kering-technologies/crm-evt_mgt-assets_api-service.git", main_branch:"develop"},
    {name:"flows/data", description:"flow-data", clone_url:"https://github.com/kering-technologies/crm-evt_mgt-flow-data.git", main_branch:"develop"},
    {name:"catwalk", description:"catwalk", clone_url:"https://github.com/kering-technologies/crm-evt_mgt-catwalk.git", main_branch:"develop"},
    {name:"flows/guest", description:"flow-guest", clone_url:"https://github.com/kering-technologies/crm-evt_mgt-flow_guest.git", main_branch:"develop"},
    {name:"orchestrator", description:"orchestrator", clone_url:"https://github.com/kering-technologies/crm-evt_mgt-orchestrator.git", main_branch:"develop"},
    {name:"flows/emrike", description:"flow-emrike", clone_url:"https://github.com/kering-technologies/crm-evt_mgt-flow-emrike.git", main_branch:"develop"},
    {name:"flows/emrike-webhook", description:"flow-emrike-webhook", clone_url:"https://github.com/kering-technologies/crm-evt_mgt-flow-emrike-webhook.git", main_branch:"develop"},
    {name:"apis/staff-management", description:"staff-management", clone_url:"https://github.com/kering-technologies/crm-evt_mgt-checkinapp-staffManagementService.git", main_branch:"develop"},
    {name:"apps/checkin", description:"checkin", clone_url:"https://github.com/kering-technologies/crm-evt_mgt-checkinapp-front.git", main_branch:"develop"},
  ],
  releases: [
    {id:'release_1.16.0', name: 'Release 1.16.0', tickets: [{name: 'US-100', description: 'Printing User Invoice containing billing address'},{name: 'US-102', description: 'Sending guest invitations'},]},
    {id:'release_1.17.0', name: 'Release 1.17.0', tickets: [{name: 'US-103', description: 'Creating Events for marketplace animations'},]},
    {id:'release_1.18.0', name: 'Release 1.18.0', tickets: [
      {name: 'TCRM-2885', description: '[EMT] Align the event management applications to use their own version of evt-mgt-db.'},
      {name: 'TCRM-2898', description: '[EMT] Upgrade flow lib version for APM - flow data & flow orchestrator'},
      {name: 'TCRM-2975', description: '[EMT] Add check-in and RSVP date in SL guests export'},
      {name: 'TCRM-3010', description: '[EMT] Launch event when status closed/completed'},
    ]},
  ]
});

export async function getDb() {
  await db.read();
  return db;
}

