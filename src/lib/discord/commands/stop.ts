import { getVoiceConnection } from '@discordjs/voice';
import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

export = {
	data: new SlashCommandBuilder().setName('stop').setDescription('Stops the current song and leaves.'),
	async execute(interaction: ChatInputCommandInteraction) {
		if (!interaction.inCachedGuild()) return;
		const connection = getVoiceConnection(interaction.guild.id);
		if (!connection) return interaction.reply('There is no song playing.');
		connection.destroy();
		return interaction.reply('Stopped the song and left the voice channel.');
	}
};
