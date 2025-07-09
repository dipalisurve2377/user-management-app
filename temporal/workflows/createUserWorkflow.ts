
import { proxyActivities } from "@temporalio/workflow";
import type * as activities from "../activities/activities.ts"

const {createUserInAuth0,updateUserStatus}=proxyActivities<typeof activities>({
    startToCloseTimeout:'10 seconds'
});

export interface CreateUserInput{
    email:string,
    password:string
}

export async function createUserWorkflow({email,password}:CreateUserInput):Promise<void> {
    try {
        await updateUserStatus(email,'provisioning');
        const auth0id=await createUserInAuth0(email,password);
        await updateUserStatus(email,"success",auth0id);
    } catch (error) {
        console.error("Workflow failed",error);
        await updateUserStatus(email,'failed');
        throw error;
    }
}

