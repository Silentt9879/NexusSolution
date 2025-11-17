// nexus-solutions/schemaTypes/index.js

import teamMember from './teamMember'
import service from './service'
import post from './post'
import blockContent from './blockContent'
import comment from './comment' // 👈 1. IMPORT IT

export const schemaTypes = [
  teamMember,
  service,
  post,
  blockContent,
  comment, // 👈 2. ADD IT TO THE ARRAY
]