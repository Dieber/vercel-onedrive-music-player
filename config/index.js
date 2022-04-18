// refererence repo: https://github.com/spencerwooo/onedrive-vercel-index

const apiConfig = {
  userName: "a451120068@gmail.com",

  // The clientId and clientSecret are used to authenticate the user with Microsoft Graph API using OAuth. You would
  // not need to change anything here if you can authenticate with your personal Microsoft account with OneDrive International.
  clientId: "ac663105-2d69-4b6c-b7d4-b1ec659bbc55",
  encryptedClientSecret:
    "0d2997228d8c725100688bbb5c799f13e35b858e457021a6d389269f6b1dc25660d4192e1acab57b7485a7b787c80656",
  // The redirectUri is the URL that the user will be redirected to after they have authenticated with Microsoft Graph API.
  // Likewise, you would not need to change redirectUri if you are using your personal Microsoft account with OneDrive International.
  redirectUri: "http://localhost",

  // 26y7Q~Xxo1qQVnSW9KstkHIAfQrRtMKZMP1la
  // These are the URLs of the OneDrive API endpoints. You would not need to change anything here if you are using OneDrive International
  // or E5 Subscription OneDrive for Business. You may need to change these if you are using OneDrive 世纪互联.
  authApi: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
  driveApi: "https://graph.microsoft.com/v1.0/me/drive",

  // The scope we require are listed here, in most cases you would not need to change this as well.
  scope: "user.read files.read.all offline_access",
};

const siteConfig = {
  baseDirectory: "/VercelMusic",
};

module.exports = { apiConfig, siteConfig };
