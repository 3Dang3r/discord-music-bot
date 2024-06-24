const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const config = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('Shows Guild queue'),
    async execute(interaction, client) {
        const { member} = interaction;
        const voiceChannel = member.voice.channel;
        const queue = client.distube.getQueue(voiceChannel)
        if(!queue){
            const queueembed = new EmbedBuilder()
            .setDescription(`There is no active queue in ${interaction.guild.name}`)
            .setColor("#04dfdf")
            return interaction.reply({embeds: [queueembed]})
        }

        const qembed = new EmbedBuilder()
        .setAuthor({name: `${interaction.guild.name} - Queue`, iconURL: interaction.guild.iconURL()})
        .setDescription(`${queue.songs.map(
            (song, id) => `\n**${id + 1}.** ${song.name} -\`${song.formattedDuration}\``
        )}`)
        .setColor("#04dfdf")
        interaction.reply({embeds: [qembed]})
    }
}