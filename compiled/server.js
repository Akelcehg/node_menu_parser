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
let parsedFile = new ExcelParser_1.ExcelParser(path);
//foodBot.botInstance.sendMessage(32317725,"dsadasdsadas");
//slava chat ID 42346292
foodBot.botInstance.on('message', (msg) => {
    const chatId = msg.chat.id;
    console.log(chatId);
    let weeks = ['/monday', '/tuesday', '/wednesday', '/thursday', '/friday'];
    if (weeks.indexOf(msg.text) >= 0) {
        //console.log(parsedFile.getMenuByWeekDay(msg.text));
        let message = parsedFile.getMenuByWeekDay(msg.text.replace('/', ''));
        message = message.join('\n');
        message = message.replace(/&quot;/g, '"');
        foodBot.botInstance.sendMessage(chatId, message);
    }
    else
        foodBot.botInstance.sendMessage(chatId, "тупо пересылаю что мне шлют '" + msg.text + "'");
});
app.listen(port, () => {
    // Success callback
    console.log(`Listening at http://localhost:${port}/`);
});
//# sourceMappingURL=server.js.map