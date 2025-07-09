import { getTemporalClient } from "../../temporal/client";
import {updateUserWorkflow, UpdateUserInput} from "../../temporal/workflows/updateUserWorkflow"

export const triggerUpdateUser= async (input:UpdateUserInput)=>{
    const client= await getTemporalClient();

    const handle= await client.start(updateUserWorkflow,{
        taskQueue:'user-management-queue',
        workflowId:`update-user-${input.email}`,
        args:[input],
    });

    console.log(`Started update workflow : ${handle.workflowId}`);

    return handle.workflowId;
}