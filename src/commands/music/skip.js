const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const config = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('skips a song'),
    async execute(interaction, client) {
        const { member} = interaction;
        const voiceChannel = member.voice.channel;
        const queue = client.distube.getQueue(voiceChannel)

        queue.skip(voiceChannel);

        const qembed = new EmbedBuilder()
        .setAuthor({name: `${interaction.guild.name}`, iconURL: interaction.guild.iconURL()})
        .setDescription(`Song Skipped.`)
        .setColor("#04dfdf")
        interaction.reply({embeds: [qembed]})
    }
}