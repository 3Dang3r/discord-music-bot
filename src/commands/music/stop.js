const { EmbedBuilder, SlashCommandBuilder} = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("stop")
        .setDescription("Stops the music"),

        async execute(interaction, client) {
            const { member} = interaction;
            const voiceChannel = member.voice.channel;
            const queue = client.distube.getQueue(interaction.guild.id);
            queue.stop(voiceChannel);

            const embed = new EmbedBuilder()
            .setAuthor({name: `${interaction.guild.name}`, iconURL: interaction.guild.iconURL()})
            .setDescription(`Queue has been stopped.`)
            .setColor("#04dfdf")
            interaction.reply({embeds: [embed]})
        }
    }