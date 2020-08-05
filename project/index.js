const express = require("express");
const TelegramBot = require("node-telegram-bot-api");
const User = require("./models/user");
const Message = require("./models/message");
const app = express();
const mongoose = require("mongoose");
const DB_URL =
  "mongodb+srv://darya:6LSyEcOFCIQPjIyn@cluster0.ryva2.mongodb.net/tgbot?retryWrites=true&w=majority";
mongoose
  .connect(DB_URL, { useNewUrlParser: true })
  .then(() => console.log("Connected"))
  .catch((err) => console.log(err));
const TOKEN = "1350149756:AAHgw6iPlMR0WAJONYqe7c3j5xQ5-jBl_4Q";

const bot = new TelegramBot(TOKEN, {
  polling: true,
});
bot.on("message", async (msg) => {
  console.log(msg);
  const candidate = await User.findOne();
  if (!candidate) {
    const user = new User({
      firstName: msg.from.first_name,
      lastName: msg.from.last_name,
      userName: msg.from.username,
      languageCode: msg.from.language_code,
      isBot: msg.from.is_bot,
    });

    await user.save();
  }
  if (msg.text.length && !msg.text.startsWith("/")) {
    const message = new Message({
      username: msg.from.username,
      text: msg.text,
    });
    await message.save();
  }
});
