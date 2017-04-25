"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const api_routes_1 = require("./routes/api_routes");
const FoodBot_1 = require("./bot/FoodBot");
const app = express();
const port = 3000;
app.use('/api', api_routes_1.ApiRoutes);
let foodBot = new FoodBot_1.FoodBot();
//foodBot.botInstance.sendMessage(32317725,"dasdas123sad");
foodBot.botInstance.on('message', (msg) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message
    const chatId = msg.chat.id;
    //const resp = match[1]; // the captured "whatever"
    // send back the matched "whatever" to the chat
    foodBot.botInstance.sendMessage(chatId, "тупо пересылаю что мне шлют '" + msg.text + "'");
});
//const token = "292543210:AAFgtWhAzrDq1ykHI2LAOxA76aWPAXuwms4";
// Create a bot that uses 'polling' to fetch new updates
//const bot = new TelegramBot(token, { polling: true });
//bot.sendMessage(32317725,"dasdas123sad");
// Matches "/echo [whatever]"
//bot.onText(/\/echo (.+)/, (msg, match) => {
// 'msg' is the received Message from Telegram
// 'match' is the result of executing the regexp above on the text content
// of the message
//const chatId = msg.chat.id;
//const resp = match[1]; // the captured "whatever"
// send back the matched "whatever" to the chat
//bot.sendMessage(chatId, resp);
//});
// Listen for any kind of message. There are different kinds of
// messages.
//bot.on('message', (msg) => {
//  const chatId = msg.chat.id;
//  console.log (chatId);
// send a message to the chat acknowledging receipt of their message
//  bot.sendMessage(chatId, 'My nigga');
//});
app.listen(port, () => {
    // Success callback
    console.log(`Listening at http://localhost:${port}/`);
});
//# sourceMappingURL=server.js.map