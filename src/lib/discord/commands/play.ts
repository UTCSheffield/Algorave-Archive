import { createAudioPlayer, createAudioResource, joinVoiceChannel, NoSubscriberBehavior } from '@discordjs/voice';
import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { createReadStream } from 'node:fs';
import { db } from '../../db.js';
import { findMediaFile } from '../findMediaFile.js';
export = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Plays a song in the voice channel you are in.')
		.addStringOption((option) => option.setName('streamtitle').setDescription('The title of the stream you want to play.').setRequired(true)),

	async execute(interaction: ChatInputCommandInteraction) {
		await interaction.deferReply();
		const streamtitle = interaction.options.getString('streamtitle');
		if (interaction.inCachedGuild()) {
			const channel = interaction.member.voice.channel;
			if (!channel?.id) return interaction.editReply('We could not find your voice channel.');
			// Core
			const voiceConnection = joinVoiceChannel({
				channelId: channel?.id,
				guildId: interaction.guildId,
				adapterCreator: channel?.guild.voiceAdapterCreator
			});
			const audioPlayer = createAudioPlayer({
				behaviors: {
					noSubscriber: NoSubscriberBehavior.Stop
				}
			});
			var resource;
			(async () => {
				//const file = findMediaFile()
				const metdataArr = (await db.all()).filter((x) => x.value.title == streamtitle);
				if (metdataArr.length === 0) {
					interaction.editReply('We could not find that stream.');
					voiceConnection.destroy();
					audioPlayer.stop();
					return;
				}
				const file = findMediaFile(metdataArr[0].value.id);
				if (file == null) {
					interaction.editReply('We could not find that file');
					voiceConnection.destroy();
					audioPlayer.stop();
					return;
				}
				resource = createAudioResource(createReadStream(`${process.cwd()}/output/${file}`));
				audioPlayer.play(resource);
				voiceConnection.subscribe(audioPlayer);
				return interaction.editReply(`Now playing ${streamtitle}`);
			})();
			return;
		} else return interaction.editReply('This command is only available in a cached guild.');
	}
};
