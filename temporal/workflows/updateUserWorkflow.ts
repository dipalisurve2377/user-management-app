import { proxyActivities } from "@temporalio/workflow";
import type * as activities from "../activities/activities.ts"


const {updateUserInAuth0,updateUserStatus}=proxyActivities<typeof activities>({
    startToCloseTimeout:'10 seconds'
});

export interface UpdateUserInput{
    email:string;
    updates:{
        email?:string;
        password?:string;

    };    
}


export async function updateUserWorkflow({email,updates}:UpdateUserInput):Promise<void>{
    try {
        await updateUserStatus(email,'updating');
        await updateUserInAuth0(email,updates);
        await updateUserStatus(email,'updated');
    } catch (error) {
      console.error("Update workflow failed:", error);
    await updateUserStatus(email, 'failed');
    throw error;   
    }
}