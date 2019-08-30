const fs = require("fs");
const { google } = require("googleapis");

const login = () => {
  const { CLIENT_SECRET, CLIENT_ID } = process.env;
  const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    "urn:ietf:wg:oauth:2.0:oob"
  );
  oAuth2Client.setCredentials(JSON.parse(process.env.TOKEN));
  return oAuth2Client;
}

module.exports = { login };
