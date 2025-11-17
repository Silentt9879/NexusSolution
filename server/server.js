// server/server.js
const express = require('express');
const { createClient } = require('@sanity/client');
const cors = require('cors');

const app = express();
app.use(cors()); // Allow requests from our React app
app.use(express.json()); // Allow server to read JSON bodies

// --- CONFIGURE YOUR CLIENTS ---

// 1. A public client (read-only, same as your React app)
const publicClient = createClient({
  projectId: "m4s7pq0x", // Your Project ID
  dataset: "production",
  useCdn: true,
  apiVersion: '2023-05-03',
});

// 2. A private, authenticated client (write-access)
const privateClient = createClient({
  projectId: "m4s7pq0x", // Your Project ID
  dataset: "production",
  useCdn: false, // Must be false for writes
  apiVersion: '2023-05-03',
  // 👇 PASTE YOUR SECRET TOKEN HERE
  token: 'skCoK1Y75R9VyBXulQDSIbe8DxeEP1pxILJqPrhbYPGGbcUKgzpVqECO8ST3AvIqg6W5GJGfnlsSmfWF0sY5DNIX6M2dTJpvGJiwbtcEzoX9BpoD3k8h2ZJAajZxYZPbOjTrEQEpZysUcSfU7sLHbFB32NkAWTrtArEQNsnp9zqbtleNWidb', 
});

// --- THE API ENDPOINT ---
app.post('/api/submit-comment', async (req, res) => {
  console.log('Received comment submission...');

  const { post, name, comment } = req.body;

  if (!post || !name || !comment) {
    return res.status(400).send('Missing fields');
  }

  try {
    // We first check if the post ID is valid and exists
    const query = `count(*[_id == $postId])`;
    const params = { postId: post };

    const postCount = await publicClient.fetch(query, params);

    if (postCount === 0) {
      console.log('Attempt to comment on a post that does not exist:', post);
      return res.status(401).send('Invalid post');
    }

    // Now, we use our *private* client to create the comment
    // It's created as "unapproved" by default
    await privateClient.create({
      _type: 'comment',
      post: {
        _type: 'reference',
        _ref: post, // This links it to the post
      },
      name: name,
      comment: comment,
      approved: false, // Default to not approved
    });

    console.log('Comment submitted for approval!');
    res.status(200).send('Comment submitted for approval!');

  } catch (err) {
    console.error('Error submitting comment:', err);
    res.status(500).send('Error submitting comment');
  }
});

// --- START THE SERVER ---
const PORT = 3001; // We'll run this on a different port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});