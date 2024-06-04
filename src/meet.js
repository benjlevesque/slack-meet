import { SpacesServiceClient } from "@google-apps/meet";
import { auth, AuthClient } from "google-auth-library";

/**  @return {AuthClient} */
const createAuthClient = () => {
  return auth.fromJSON({
    type: "authorized_user",
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    refresh_token: process.env.TOKEN,
  });
};

/** @return {Promise<string>} */
export const createMeet = async () => {
  const authClient = createAuthClient();
  const meetClient = new SpacesServiceClient({ authClient });
  const response = await meetClient.createSpace();
  return response[0].meetingUri;
};
