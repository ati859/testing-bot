/**
 * TRINOX STUDIO - Bre4d777
 * give credits or ill touch you in your dreams
 * LEAKED BY CODEX
 */
import 'dotenv/config';

export const config = {
  // Discord Bot Configuration
  token: process.env.DISCORD_TOKEN || 'YOUR_BOT_TOKEN_HERE',
  prefix: process.env.PREFIX || '.',
  ownerIds: process.env.OWNER_IDS ? process.env.OWNER_IDS.split(',') : ['YOUR_USER_ID_HERE'], // Replace with your Discord user ID

  // Lavalink Configuration - V4 nodes only (non-SSL)
  nodes: [
    {
      name: process.env.LAVALINK_NAME || 'Lavalink Node 1',
      url: process.env.LAVALINK_URL || 'localhost:2333',
      auth: process.env.LAVALINK_PASSWORD || 'youshallnotpass',
      secure: process.env.LAVALINK_SECURE === 'true' || false
    }
  ],

  // Spotify Integration
  spotify: {
    clientId: process.env.SPOTIFY_CLIENT_ID || 'YOUR_SPOTIFY_CLIENT_ID',
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET || 'YOUR_SPOTIFY_CLIENT_SECRET'
  },

  // Database Configuration
  database: {
    guild: './database/guild.db',
    user: './database/user.db',
    player: './database/player.db',
    spotify: './database/spotify.db',
    premium: './database/premium.db'
  },

  // Bot Status Configuration
  status: {
    text: process.env.STATUS_TEXT || 'Leaked by CodeX',
    status: process.env.STATUS_TYPE || 'dnd'
  },

  // Console Colors
  colors: {
    info: '#3498db',
    success: '#2ecc71',
    warning: '#f39c12',
    error: '#e74c3c'
  },

  // Easter egg - Hidden watermark
  watermark: 'coded by bre4d'
};