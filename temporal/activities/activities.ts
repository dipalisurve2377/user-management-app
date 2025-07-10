import axios from "axios";
import mongoose, { connection } from "mongoose"
import dotenv from "dotenv";
import { getAuth0Token } from "../auth0Service";




dotenv.config();

let connected=false;

const connectDB=async()=>{
    if(!connected)
    {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://dipali:dipali2000@cluster0.pdgsqtx.mongodb.net/');
        connected=true
    }
};

// User Schema (duplicate of backend's User model)

const userSchema = new mongoose.Schema(
  {
    email: String,
    auth0Id: String,
    status: String,
  },
  { timestamps: true }
);
const User = mongoose.models.User || mongoose.model('User', userSchema);


// Auth0 activity

export const createUserInAuth0=async(email:string,password:string):Promise<string>=>{

   
    const token=await getAuth0Token();
     
 console.log("Creating Auth0 user with:", { email, password, token });

    const userRes= await axios.post(`https://dev-kfmfhnq5hivv164x.us.auth0.com/api/v2/users`,{ // AUTH_DOMAIN from env
        email,
        password,
        connection:`Username-Password-Authentication`,
        email_verified: false, 
        verify_email: false 
    },
    {
        headers:{
             Authorization: `Bearer ${token}`,
            
        }
    }
);
return userRes.data.user_id;
}

// mongoDB activity

export const updateUserStatus=async(
    email:string,
    status:'provisioning' | 'success' | 'failed' | 'updating' | 'deleting' | 'updated' | 'deleted',
    auth0Id?:string
)=>{
    await connectDB();

    const update:any={status};

    if(auth0Id) update.auth0Id=auth0Id;

    await User.findOneAndUpdate({email},update,{upsert:true,new:true,})
}


// update in auth0 activity

export const updateUserInAuth0 =async(
    email:string,
    updates:{email?:string;password?:string}
):Promise<void>=>{
    await connectDB();

    const user=await User.findOne({email});

    if(!user || !user.auth0Id){
        throw new Error("User of Auth0 ID not found")
    }

  

    const token=await getAuth0Token();

     const payload: any = { ...updates };
  if (updates.password) {
    payload.connection = 'Username-Password-Authentication';
  }

    await axios.patch(
        `https://dev-kfmfhnq5hivv164x.us.auth0.com/api/v2/users/${user.auth0Id}`,
        updates,
        {
            headers:{
                Authorization: `Bearer ${token}`,
            }
        }
    )
}


export const deleteUserFromAuth0=async(email:string):Promise<void>=>{
    await connectDB();
    
    const user=await User.findOne({email});

    if (!user || !user.auth0Id) {
    throw new Error('User not found or missing Auth0 ID');
  }



    const token=await getAuth0Token();

    await axios.delete(
        `https://dev-kfmfhnq5hivv164x.us.auth0.com/api/v2/users/${user.auth0Id}`,
    {
        headers:{
            Authorization: `Bearer ${token}`,
        }
    }
 )
 await User.deleteOne({ email });
}

export const listUsersFromAuth0=async():Promise<any[]>=>{
   

    const token=await getAuth0Token();

    const usersRes= await axios.get('https://dev-kfmfhnq5hivv164x.us.auth0.com/api/v2/users',{
        headers:{
             Authorization: `Bearer ${token}`,
        }
    })

    return usersRes.data;
}