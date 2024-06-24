module.exports = {
    name: 'ready',
    once: true,

    /**
     * 
     * @param {Client} client 
     */

    async execute(client) {
        const process = require('node:process')
        process.on("unhandledRejection", (reason, promise) => {
            console.log(promise, reason)
          });
          process.on("uncaughtException", (err, origin) => {
            console.log(err, origin)
          });
          process.on("uncaughtExceptionMonitor", (err, origin) => {
            console.log(err, origin)
          });

          process.on('warning', (warning) => {
            console.warn(warning.name);  
          });
    }
}