const config = require("../config.json");
const { OpenAI } = require("openai");
const openai = new OpenAI({ apiKey: config.openai_api_key });
const translate = require("@iamtraction/google-translate");

module.exports = {
  name: "chat",
  aliases: ["chat"],
  inVoiceChannel: false,
  run: async (client, message, args) => {
    const loadingMessage = await message.channel.send(
      "⏳ Processing your request..."
    );
    const userInput = args.join(" ");
    try {
      translate(userInput, { to: "en" }).then(async (res) => {
        //console.log(res);
        const completion = await openai.chat.completions.create({
          messages: [{ role: "assistant", content: res.text }],
          model: "gpt-3.5-turbo",
        });
        translate(completion.choices[0].message.content, {
          from: "en",
          to: "km",
        }).then((res) => {
          //console.log(res);
          message.reply(res.text);
          loadingMessage.delete();
        });
      });
    } catch (error) {
      message.reply(error);
      loadingMessage.delete();
    }

    //const userInput = message.content;

    // translate(userInput, { to: "en" })
    //   .then((res) => {
    //     console.log(res.text);
    //     const completion = openai.chat.completions.create({
    //       messages: [{ role: "user", content: res.text }],
    //       model: "gpt-3.5-turbo",
    //     });

    //     translate(completion.choices[0].message, { from: "en", to: "km" }).then(
    //       (khtext) => {
    //         message.reply(khtext);
    //       }
    //     );

    //     loadingMessage.delete();
    //   })
    //   .catch((err) => {
    //     console.error("Error fetching response from ChatGPT:", err);
    //     message.reply("An error occurred while processing your request.");
    //   });
  },
};
