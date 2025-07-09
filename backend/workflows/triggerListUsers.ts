import { getTemporalClient } from "../../temporal/client";
import {listUserWorkflow} from "../../temporal/workflows/listUsersWorkflow";

export const triggerListUsers = async () => {
  const client = await getTemporalClient();

  const handle = await client.start(listUserWorkflow, {
    taskQueue: "user-management-queue",
    workflowId: `list-users-${Date.now()}`, 
    args: [],
  });

  console.log(`Started workflow ${handle.workflowId}`);

  
  const result = await handle.result();
  return result;
};