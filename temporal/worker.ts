import { Worker } from "@temporalio/worker";
import * as activities from "./activities/activities"
import * as workflows from "./workflows";

async function runWorker(){

   const worker = await Worker.create({
    workflowsPath: require.resolve('./workflows'),    
    activities,
    taskQueue: 'user-management-queue',
  });
    console.log('Worker started on task queue : user-management-queue');

    await worker.run();
}

runWorker().catch((err)=>{
    console.error('Worker failed',err);
    process.exit(1)
})

