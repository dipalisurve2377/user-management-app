import { proxyActivities } from "@temporalio/workflow";

import type * as activities from "../activities/activities.js"

const {listUsersFromAuth0}=proxyActivities<typeof activities>({
    startToCloseTimeout:"10 seconds",

});

export async function listUserWorkflow():Promise<any[]>{
    try {
        const users = await listUsersFromAuth0();
        return users;
    } catch (error) {
    console.error("List users workflow failed:", error);
    throw error;
    }
}


