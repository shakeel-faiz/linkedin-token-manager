const express = require('express');
const axios = require('axios');
const router = express.Router();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const SCOPES = process.env.SCOPES;

// Start OAuth
router.get('/login', (req, res) => {
  const authUrl =
    `https://www.linkedin.com/oauth/v2/authorization` +
    `?response_type=code` +
    `&client_id=${CLIENT_ID}` +
    `&redirect_uri=${REDIRECT_URI}` +
    `&scope=${SCOPES}`;

  res.redirect(authUrl);
});

// Callback
router.get('/callback', async (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.send("No code found!");
  }

  try {
    const response = await axios.post(
      'https://www.linkedin.com/oauth/v2/accessToken',
      null,
      {
        params: {
          grant_type: 'authorization_code',
          code: code,
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          redirect_uri: REDIRECT_URI
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    const token = response.data.access_token;

    console.log("✅ TOKEN:", token);

    res.redirect(`/success.html?token=${token}&expires=${response.data.expires_in}`);

  } catch (error) {
    console.error("❌ Error:", error.response?.data || error.message);
    res.status(500).send("Auth Failed");
  }
});

module.exports = router;
