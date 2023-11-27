module.exports = {
  name: "ping",
  aliases: ["ping"],
  inVoiceChannel: false,
  run: async (client, message, args) => {
    return message.channel.send(
      `🏓 Latency is ${
        Date.now() - message.createdTimestamp
      }ms. API Latency is ${Math.round(client.ws.ping)}ms`
    );
  },
};
