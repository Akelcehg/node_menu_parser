import * as express from 'express'
import { ApiRoutes } from './routes/api_routes'
import { FoodBot } from './bot/FoodBot'

const app: express.Application = express();
const port: number = 3000;

app.use('/api', ApiRoutes);

let foodBot = new FoodBot();
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