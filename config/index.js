// refererence repo: https://github.com/spencerwooo/onedrive-vercel-index

const apiConfig = {
  // The clientId and clientSecret are used to authenticate the user with Microsoft Graph API using OAuth. You would
  // not need to change anything here if you can authenticate with your personal Microsoft account with OneDrive International.
  clientId: "d87bcc39-1750-4ca0-ad54-f8d0efbb2735",
  encryptedClientSecret:
    "U2FsdGVkX1830zo3/pFDqaBCVBb37iLw3WnBDWGF9GIB2f4apzv0roemp8Y+iIxI3Ih5ecyukqELQEGzZlYiWg==",

  // The redirectUri is the URL that the user will be redirected to after they have authenticated with Microsoft Graph API.
  // Likewise, you would not need to change redirectUri if you are using your personal Microsoft account with OneDrive International.
  redirectUri: "http://localhost",

  // These are the URLs of the OneDrive API endpoints. You would not need to change anything here if you are using OneDrive International
  // or E5 Subscription OneDrive for Business. You may need to change these if you are using OneDrive 世纪互联.
  authApi: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
  driveApi: "https://graph.microsoft.com/v1.0/me/drive",

  // The scope we require are listed here, in most cases you would not need to change this as well.
  scope: "user.read files.read.all offline_access",
};

const siteConfig = {
  shit: 1,
};

module.exports = { apiConfig, siteConfig };
