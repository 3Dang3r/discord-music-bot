const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const config = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Plays a song based on the search query')
        .addStringOption(option => option.setName('query').setDescription('The name of the song to play').setRequired(true)),
    async execute(interaction, client) {
        try {
            const { member, channel } = interaction;
            const query = interaction.options.getString('query');
            const voiceChannel = member.voice.channel;

            if (!voiceChannel) {
                return interaction.reply({ content: 'You need to be in a voice channel to play music!', ephemeral: true });
            }

        
            await interaction.deferReply({});

            const searchResult = await client.player.search(query, {
                requestedBy: interaction.user
            });

            if (!searchResult || !searchResult.tracks.length) {
                return interaction.editReply({ content: 'No results found!' });
            }

            const track = searchResult.tracks[0];

 
            const queue = client.distube.getQueue(voiceChannel);

            client.distube.play(voiceChannel, track.url, { textChannel: channel, member });

            client.distube.once('addSong', (queue, song) => {
                if (queue.voiceChannel.id === voiceChannel.id && queue.songs.length > 1) {
                    const addedEmbed = new EmbedBuilder()
                        .setDescription(`Added **${song.name}** to the queue!`)
                        .setColor('#04dfdf');
                    interaction.followUp({ embeds: [addedEmbed] });
                }
            });


            client.distube.once('playSong', (queue, playingSong) => {
                if (queue.voiceChannel.id === voiceChannel.id) {
                    const playEmbed = new EmbedBuilder()
                    .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL() })
                        .setTitle('Now Playing')
                        .setDescription(`**${playingSong.name}**`)
                        .addFields(
                            { name: 'Author', value: `\`${playingSong.uploader.name}\``, inline: true },
                            { name: 'Duration', value: `\`${playingSong.formattedDuration}\``, inline: true },
                            { name: 'Requester', value: `${interaction.user}`, inline: false },
                        )
                        .setThumbnail(playingSong.thumbnail)
                        .setColor('#04dfdf');
                    interaction.followUp({ embeds: [playEmbed] });
                }
            });

        } catch (error) {
            console.error('Error executing play command:', error);
            interaction.reply({ content: 'Error executing the command!' });
        }
    },
};
