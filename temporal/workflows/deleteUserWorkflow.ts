import { proxyActivities } from "@temporalio/workflow";

import * as activities from "../activities/activities.js";

const { deleteUserFromAuth0, updateUserStatus } = proxyActivities<
  typeof activities
>({
  startToCloseTimeout: "10 seconds",
  retry: {
    maximumAttempts: 5,
    initialInterval: "2s",
    backoffCoefficient: 2,
    maximumInterval: "30s",
    nonRetryableErrorTypes: [
      "Auth0ClientError",
      "MissingAuth0ID",
      "GenericDeleteFailure",
    ],
  },
});

export interface DeleteUserInput {
  email: string;
}

export async function deleteUserWorkflow({
  email,
}: DeleteUserInput): Promise<void> {
  try {
    await updateUserStatus(email, "deleting");
    await deleteUserFromAuth0(email);
    await updateUserStatus(email, "deleted");
  } catch (error) {
    console.error("Delete workflow failed:", error);
    await updateUserStatus(email, "failed");
    throw error;
  }
}
