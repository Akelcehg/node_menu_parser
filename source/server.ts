import * as express from 'express'
import { ApiRoutes } from './routes/api_routes'
import { FoodBot } from './bot/FoodBot'
import * as weeksObject from '../config/daysWeekRange.json'
import { ExcelParser } from './parser/ExcelParser'

const app: express.Application = express();
const port: number = 3000;

app.use('/api', ApiRoutes);

let foodBot = new FoodBot();
let path = "./data/food.xlsx";
let parsedFile = new ExcelParser(path);

foodBot.botInstance.on('message', (msg) => {
  const chatId = msg.chat.id;
  let weeks = ['/monday', '/tuesday', '/wednesday', '/thursday', '/friday'];

  if (weeks.indexOf(msg.text) >= 0) {
    //console.log(parsedFile.getMenuByWeekDay(msg.text));
    let message = parsedFile.getMenuByWeekDay(msg.text.replace('/',''));
    message = message.join('\n');
    message = message.replace(/&quot;/g,'"');
    foodBot.botInstance.sendMessage(chatId, message);
  } else  foodBot.botInstance.sendMessage(chatId, "тупо пересылаю что мне шлют '" + msg.text + "'");
});

app.listen(port, () => {
  // Success callback
  console.log(`Listening at http://localhost:${port}/`);
});