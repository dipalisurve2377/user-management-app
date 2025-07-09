import axios from "axios";
import dotenv from "dotenv";

dotenv.config();


export const getAuth0Token = async (): Promise<string> => {
  try {
    const response = await axios.post(
      "https://dev-kfmfhnq5hivv164x.us.auth0.com/oauth/token",
      {
        client_id: process.env.AUTH0_CLIENT_ID as string,
        client_secret: process.env.AUTH0_CLIENT_SECRET as string,
        audience: process.env.AUTH0_AUDIENCE as string,
        grant_type: "client_credentials",
      }
    );

    return response.data.access_token;
  } catch (error: any) {
    console.error(
      "Failed to get Auth0 token:",
      error.response?.data || error.message
    );
    throw error;
  }
};
