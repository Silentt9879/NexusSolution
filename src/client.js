// src/client.js
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// This is your connection details
export const client = createClient({
  projectId: "m4s7pq0x", // 👈 Paste your projectId here
  dataset: "production",
  useCdn: true, // `false` if you want to ensure fresh data
  apiVersion: '2023-05-03', // Use a current date
});

// This is a helper function to get image URLs
const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);