export const LOG_ACTIONS = {
    ERROR: 'error',
    CHECKOUT: 'checkout',
    PULL: 'pull',
    COMMITS: 'commits',
    ALL_DONE: 'all_done'
  }
  
  export type SubmoduleStream = {
    submodule?:string;
    message?:string;
    action:string;
    commits?:Commit[]
  }
  
  export type Commit = {
    hash: string;
    date: string;
    message: string;
  };
  