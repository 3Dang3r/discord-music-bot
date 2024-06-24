const { EmbedBuilder, SlashCommandBuilder} = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("volume")
        .setDescription("Sets Song Volume!")
        .addStringOption(option => option.setName("number").setDescription("1-100").setRequired(true)),

        async execute(interaction, client) {
            const volume = interaction.options.getString("number")
            const num = parseInt(volume)

            const queue = client.distube.getQueue(interaction.guild.id);
            if (!queue) return interaction.reply(`There is no song on the list yet.`)
            if (isNaN(num)) return interaction.reply("Give me number!")
            if (num < 1) return interaction.reply("The number must not be less than 1.")
            if (num > 100) return interaction.reply("The number should not be greater than 100.")
            client.distube.setVolume(interaction, num);

            const embed = new EmbedBuilder()
            .setAuthor({name: `${interaction.guild.name}`, iconURL: interaction.guild.iconURL()})
            .setDescription(`Successfully set the volume to ${num}%`)
            .setColor("#04dfdf")
            interaction.reply({embeds: [embed]})
        }
    }