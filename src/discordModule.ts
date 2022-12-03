import { Events } from 'discord.js';
import { discordClient } from './lib/discord/client.js';
import fs from 'node:fs';
import path from 'node:path';

discordClient.once(Events.ClientReady, (client) => {
	console.log(`Logged into discord as ${client.user.tag}`);
});

const commandsPath = `${process.cwd()}/dist/lib/discord/commands`;
const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		discordClient.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

discordClient.on(Events.InteractionCreate, (interaction) => {
	if (!interaction.isChatInputCommand()) return;
	const command = discordClient.commands.get(interaction.commandName);
	if (!command) {
		console.log(`No command found for ${interaction.commandName}`);
		return;
	}
	try {
		command.execute(interaction);
	} catch (error) {
		console.log(`error`, error);
		interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

discordClient.login(process.env.DISCORD_TOKEN);
