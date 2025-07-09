import { triggerCreateUser } from "../workflows/triggerCreateUser.ts";
import {triggerUpdateUser} from "../workflows/triggerUpdateUser.ts"
import { triggerDeleteUser } from "../workflows/triggerDeleteUser.ts";
import { triggerListUsers } from "../workflows/triggerListUsers.ts";

export const createUserController=async(req,res)=>{
    const {email,password}=req.body;

    if(!email || !password)
    {
        return res.status(400).json({ error: 'Email and password are required.'})
    }

    try {
        const workflowId= await triggerCreateUser({email,password});
            res.status(200).json({ message: 'User provisioning started', workflowId });
    } catch (error) {
     console.error('Error starting workflow:', error);
    res.status(500).json({ error: 'Failed to start user creation workflow' });   
    }
}

export const updateUserController=async(req,res)=>{
    const {email,updates}=req.body;

    if (!email || !updates) {
    return res.status(400).json({ error: 'Email and updates are required.' });
  }

  try {
    const workflowId=await triggerUpdateUser({email,updates});
    res.status(200).json({ message: 'User update started', workflowId });
  } catch (error) {
   console.error('Error starting update workflow:', error);
    res.status(500).json({ error: 'Failed to start user update workflow' }); 
  }
}



// delete user

export const deleteUserController=async (req,res)=>{
    const {email}=req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required.' });
  }

  try {
     const workflowId = await triggerDeleteUser({ email });
    res.status(200).json({ message: 'User deletion started', workflowId });
  } catch (error) {
   console.error('Error starting delete workflow:', error);
    res.status(500).json({ error: 'Failed to start user deletion workflow' });   
  }
}


// list users 

export const listUsersController=async (req,res)=>{
    try {
    const users=await triggerListUsers();
    const cleanedUsers = users.map(user => ({
      email: user.email,
      user_id: user.user_id,
      created_at: user.created_at,
      // email_verified: user.email_verified,
    }));

    res.status(200).json({ users: cleanedUsers });
        // res.status(200).json({users});

    } catch (error) {
     
    console.error("Error listing users:", error);
    res.status(500).json({ error: "Failed to fetch users from Auth0" });   
    }
}