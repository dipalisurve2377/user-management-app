
import {getTemporalClient} from "../../temporal/client";
import {CreateUserInput, createUserWorkflow} from "../../temporal/workflows/createUserWorkflow";

export const triggerCreateUser=async(input:CreateUserInput)=>{
    const client= await getTemporalClient();

    const handle= await client.start(createUserWorkflow,{
        taskQueue:'user-management-queue',
        workflowId:`create-user-${input.email}`,
        args:[input]
    });

    console.log(`Started workflow ${handle.workflowId}`);
    return handle.workflowId
}