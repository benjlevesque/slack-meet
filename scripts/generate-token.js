import { authenticate } from "@google-cloud/local-auth";
import * as path from "node:path";

const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json");
const SCOPES = ["https://www.googleapis.com/auth/meetings.space.created"];

const main = async () => {
  const client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  console.log("Use the following in your TOKEN env var:");
  console.log(client.credentials.refresh_token);
};

void main();
