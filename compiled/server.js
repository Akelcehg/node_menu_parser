"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const api_routes_1 = require("./routes/api_routes");
const FoodBot_1 = require("./bot/FoodBot");
const ExcelParser_1 = require("./parser/ExcelParser");
const app = express();
const port = 3000;
app.use('/api', api_routes_1.ApiRoutes);
let foodBot = new FoodBot_1.FoodBot();
let path = "./data/food.xlsx";
//let parsedFile = new ExcelParser(path);
//foodBot.botInstance.sendMessage(32317725,"dsadasdsadas");
//slava chat ID 42346292
foodBot.botInstance.onText(/\/menu/, function onLoveText(msg) {
    let weeks = ['/monday', '/tuesday', '/wednesday', '/thursday', '/friday'];
    const opts = {
        reply_to_message_id: msg.message_id,
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{
                        text: 'Понедельник',
                        callback_data: '/monday'
                    }],
                [{
                        text: 'Вторник',
                        callback_data: '/tuesday'
                    }], [{
                        text: 'Среда',
                        callback_data: '/wednesday'
                    }], [{
                        text: 'Четверг',
                        callback_data: '/thursday'
                    }], [{
                        text: 'Пятница',
                        callback_data: '/friday'
                    }]
            ]
        })
    };
    foodBot.botInstance.sendMessage(msg.chat.id, 'На какой день еду показать?', opts);
    //foodBot.botInstance.sendMessage(msg.from.id, 'Original Text', opts);
});
/*
foodBot.botInstance.on('message', (msg) => {
  const chatId = msg.chat.id;
  
  let weeks = ['/monday', '/tuesday', '/wednesday', '/thursday', '/friday'];
  if (weeks.indexOf(msg.text) >= 0) {
    let message: any = parsedFile.getMenuByWeekDay(msg.text.replace('/', ''));
    message = message.join('\n');
    message = message.replace(/&quot;/g, '"');
    foodBot.botInstance.sendMessage(chatId, message);
  } else foodBot.botInstance.sendMessage(chatId, "тупо пересылаю что мне шлют '" + msg.text + "'");

});*/
foodBot.botInstance.on('callback_query', function onCallbackQuery(callbackQuery) {
    const action = callbackQuery.data;
    const msg = callbackQuery.message;
    console.log("3123213213");
    //console.log (callbackQuery);
    console.log(action);
    const opts = {
        chat_id: msg.chat.id,
        message_id: msg.message_id,
    };
    let text;
    let weeks = ['/monday', '/tuesday', '/wednesday', '/thursday', '/friday'];
    let parsedFile = new ExcelParser_1.ExcelParser(path);
    if (weeks.indexOf(action) >= 0) {
        let message = parsedFile.getMenuByWeekDay(action.replace('/', ''));
        for (let i = 0; i < message.length; i++) {
            message[i] = i + 1 + ') ' + message[i];
        }
        message = message.join('\n');
        message = message.replace(/&quot;/g, '"');
        foodBot.botInstance.sendMessage(opts.chat_id, message);
        //return foodBot.botInstance.answerCallbackQuery(callbackQuery.id, 'Ok, here ya go!');
    }
    return true;
    // else foodBot.botInstance.sendMessage(chatId, "тупо пересылаю что мне шлют '" + msg.text + "'");
    //foodBot.botInstance.editMessageText(text, opts);
});
/*
foodBot.botInstance.on('polling_error', (error) => {
  console.log(error.code);
});

foodBot.botInstance.on('webhook_error', (error) => {
  console.log(error.code);
});*/
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`);
});
//# sourceMappingURL=server.js.map