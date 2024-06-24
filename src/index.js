const fs = require('fs');
const {Collection,Client,GatewayIntentBits,ActivityType, EmbedBuilder} = require('discord.js');
const Distube = require("distube")
const { SpotifyPlugin } = require("@distube/spotify")
const { SoundCloudPlugin } = require("@distube/soundcloud")
const { Player } = require("discord-player")
const client = new Client({
  intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildMessageReactions,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildPresences,
      GatewayIntentBits.GuildVoiceStates,
  ],
});
client.activeGiveaways = new Collection();
client.commands = new Collection();
const config = require('./config.json')

const functions = fs.readdirSync("./src/functions").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"));
const commandFolders = fs.readdirSync("./src/commands");
const player = new Player(client);
client.player = player;

(async () => {
  for (file of functions) {
      require(`./functions/${file}`)(client);
  }
  client.handleEvents(eventFiles, "./src/events");
  client.handleCommands(commandFolders, "./src/commands");
  client.login(config.token)
})();

client.distube = new Distube.default(client, {
  leaveOnEmpty: true,
  emptyCooldown: 30,
  leaveOnFinish: false,
  emitNewSongOnly: true,
  nsfw: true,
  plugins: [new SoundCloudPlugin(), new SpotifyPlugin()]
})