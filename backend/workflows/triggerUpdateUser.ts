import { getTemporalClient } from "../../temporal/client";
import {
  updateUserWorkflow,
  UpdateUserInput,
} from "../../temporal/workflows/updateUserWorkflow";

export const triggerUpdateUser = async (input: UpdateUserInput) => {
  const client = await getTemporalClient();

  const handle = await client.start(updateUserWorkflow, {
    taskQueue: "user-management-queue",
    workflowId: `update-user-${input.email}`,
    args: [input],
    retry: {
      maximumAttempts: 3,
      initialInterval: "5s",
      backoffCoefficient: 2,
      maximumInterval: "30s",
      nonRetryableErrorTypes: [
        "Auth0ClientError",
        "MissingAuth0ID",
        "GenericUpdateFailure",
      ],
    },
  });

  console.log(`Started update workflow : ${handle.workflowId}`);

  return handle.workflowId;
};
