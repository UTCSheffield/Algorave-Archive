import { Client, Collection, GatewayIntentBits } from 'discord.js';
export const discordClient = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates]
});
discordClient.commands = new Collection();

declare module 'discord.js' {
	export interface Client {
		commands: any;
	}
}
