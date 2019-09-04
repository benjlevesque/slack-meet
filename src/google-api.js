import { google } from "googleapis";

export const login = () => {
  const { CLIENT_SECRET, CLIENT_ID } = process.env;
  const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    "urn:ietf:wg:oauth:2.0:oob"
  );
  if (!process.env.TOKEN) {
    getAccessToken();
    return null;
  }
  oAuth2Client.setCredentials(JSON.parse(process.env.TOKEN));
  return oAuth2Client;
};
