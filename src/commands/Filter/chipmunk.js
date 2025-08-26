/**
 * TRINOX STUDIO - Bre4d777
 * give credits or ill touch you in your dreams
 * LEAKED BY CODEX
 */
import { Command } from '../../structures/Command.js';
import { embedManager } from '../../managers/EmbedManager.js';
import { logger } from '../../utils/logger.js';

/**
 * Command to apply the chipmunk filter to the current playing track
 */
class ChipmunkFilterCommand extends Command {
  constructor() {
    super({
      name: 'chipmunk',
      description: 'High-pitched voice effect',
      usage: 'chipmunk',
      category: 'filters',
      cooldown: 3,
      sameVoiceRequired: true,
      voiceRequired: true,
      playerRequired: true,
      playingRequired: true,
      examples: ['chipmunk']
    });
  }

  /**
   * Execute the chipmunk filter command
   * @param {object} options - Command options
   * @returns {Promise<void>}
   */
  async execute({ message, client, musicManager }) {
    const { guild } = message;

    try {
      // Check if there's an active player
      const player = musicManager.getPlayer(guild.id);
      if (!player || (!player.queue.current && !player.playing)) {
        const reply = embedManager.error(
          'No Active Player',
          'There is no music currently playing. Use the play command first!'
        );
        return message.reply({ embeds: [reply] });
      }

      // Store the current volume to restore it after filter application
      const currentVolume = player.volume;
      
      // Apply the filter
      try {
        // Clear any existing filters first
        player.shoukaku.clearFilters();
        
        // Get the filter configuration
        const filterConfig = {
          category: "tempo",
          timescale: {"pitch":1.35,"rate":1.25},
          description: "High-pitched voice effect"
        };
        
        // Apply the filter
        player.shoukaku.setFilters(filterConfig);
        
        // Restore volume
        player.setVolume(currentVolume);
        
        // Send success message
        const reply = embedManager.success(
          'Filter Applied',
          `Applied **chipmunk** filter

Description: High-pitched voice effect`
        );
        return message.reply({ embeds: [reply] });
      } catch (filterError) {
        logger.error('ChipmunkFilterCommand', `Error applying filter chipmunk:`, filterError);
        
        const reply = embedManager.error(
          'Filter Error',
          `Failed to apply filter: chipmunk. Please try again.`
        );
        return message.reply({ embeds: [reply] });
      }
    } catch (error) {
      logger.error('ChipmunkFilterCommand', 'Error executing command:', error);
      
      const reply = embedManager.error(
        'Error',
        'An error occurred while trying to apply the filter.'
      );
      return message.reply({ embeds: [reply] });
    }
  }
}

export default new ChipmunkFilterCommand();
