const {GatewayIntentBits, ActivityType } = require('discord.js');
const config = require('../config.json')
module.exports = {
    name: 'ready',
    once: true,

    /**
     * 
     * @param {Client} client 
     */

    async execute(client) {
        console.log(`[${client.user.tag}](${client.user.id}) \n logged in successfully!`)
    }
}