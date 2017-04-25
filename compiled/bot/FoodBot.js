"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TelegramBot = require("node-telegram-bot-api");
const botConfig = require("../../config/telegram.json");
class FoodBot {
    constructor() {
        this.token = botConfig['token'];
        this.botInstance = new TelegramBot(this.token, { polling: true });
    }
}
exports.FoodBot = FoodBot;
//# sourceMappingURL=FoodBot.js.map