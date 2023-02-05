require("dotenv").config();

const appleOauthConfig = {
  client_id: process.env.APPLE_CLIENT_ID,
  team_id: process.env.APPLE_TEAM_ID,
  key_id: process.env.APPLE_KEY_ID,
  redirect_uri: process.env.APPLE_REDIRECT_URI,
  private_key_path: process.env.APPLE_PRIVATE_KEY_PATH,
};

module.exports = {
  appleOauthConfig,
};
