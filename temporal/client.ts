// creating a connection to temporal
// returning WorkflowClient so i can trigger workflows from backend

import { Connection, WorkflowClient } from '@temporalio/client';

export const getTemporalClient = async () => {
  const connection = await Connection.connect({
    address: 'localhost:7233',
  });

  return new WorkflowClient({ connection });
};
