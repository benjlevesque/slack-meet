# Slack Meet

Enables `/meet` command in Slack to instantly create a Google Meet conference.

## How to run

```sh
docker run \
  -e CLIENT_ID=[CLIENT_ID]
  -e CLIENT_SECRET=[CLIENT_SECRET]
  -e TOKEN=[TOKEN]
  benjlevesque/slack-meet
```

## Generate the token

1. Clone this repository and run `pnpm install`
2. Open your Google Cloud project (or create a new one)
3. In "API & Services > Enabled API and services", enable the "Google Meet API"
4. In "API & Services > Credentials", create a new OAuth client of type "desktop"
5. Save the client ID and client secret for later use
6. Download the JSON file of this client secret, and save it as `credentials.json`
7. Run `pnpm generate-token`:  authorize your Google account
8. Copy the generated token, and remove `credentials.json`
9. You can now start the app with `CLIENT_ID`, `CLIENT_SECRET`, and `TOKEN`
