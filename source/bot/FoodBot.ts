import * as TelegramBot from 'node-telegram-bot-api'
import * as botConfig from '../../config/telegram.json'

class FoodBot {

    private token;
    public botInstance;

    constructor(){
        this.token = botConfig['token'];
        this.botInstance = new TelegramBot(this.token, { polling: true });
    }
    


}

export { FoodBot }