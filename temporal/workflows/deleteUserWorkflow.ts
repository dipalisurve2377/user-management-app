import { proxyActivities } from "@temporalio/workflow";

import * as activities from "../activities/activities.js"

const {deleteUserFromAuth0,updateUserStatus}=proxyActivities<typeof activities>({
    startToCloseTimeout:'10 seconds',
})

export interface DeleteUserInput{
    email:string;
}

export async function deleteUserWorkflow({email}:DeleteUserInput):Promise<void>{
    try {
        await updateUserStatus(email,'deleting');
        await deleteUserFromAuth0(email);
        await updateUserStatus(email,'success')
    } catch (error) {
      console.error('Delete workflow failed:', error);
    await updateUserStatus(email, 'failed');
    throw error;   
    }
}