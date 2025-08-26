import { logger } from '../../utils/logger.js';
import { db } from '../../database/DatabaseManager.js';

export default {
  name: 'messageCreate',
  async execute(message, client) {
    if (message.author.bot) return;

    try {
      const mentions = message.mentions;
      
      // Check if bot is mentioned directly (not through role/everyone)
      const isBotMentioned = mentions.users.has(client.user.id) && 
        !mentions.everyone && 
        !mentions.roles.size;
      
      // If not mentioned, handle as regular command
      if (!isBotMentioned) {
        return client.commandHandler.handleMessage(message);
      }

      // Handle direct mention - check if it's just a mention without content
      const mentionRegex = new RegExp(`^<@!?${client.user.id}>\\s*$`);
      if (mentionRegex.test(message.content.trim())) {
        const guildPrefix = db.getPrefix(message.guild.id);
        await message.reply(
          `<:wavee:1388104422630096997> Hey! I'm here to help! Use ${guildPrefix}help to see my commands.`
        );
        return;
      }

      // Handle mention with command
      const cleanContent = message.content.replace(new RegExp(`<@!?${client.user.id}>`), '').trim();
      if (cleanContent) {
        const firstWord = cleanContent.split(/\s+/)[0];
        if (client.commandHandler.commands.has(firstWord) || client.commandHandler.aliases.has(firstWord)) {
          // Temporarily modify the message content for command processing
          const originalContent = message.content;
          message.content = cleanContent;
          const result = await client.commandHandler.handleMessage(message);
          message.content = originalContent; // Restore original content
          return result;
        }
      }

    } catch (error) {
      logger.error('MessageCreate', 'Error', error);
    }
  }
};