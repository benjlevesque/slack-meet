import dotenv from "dotenv";

export const initConfig = () => {
  dotenv.config();
  const requiredConfig = ["CLIENT_ID", "CLIENT_SECRET", "TOKEN"];
  for (const config of requiredConfig) {
    if (!process.env[config]) {
      console.error(`missing required config ${config}`);
      process.exit(1);
    }
  }
};
