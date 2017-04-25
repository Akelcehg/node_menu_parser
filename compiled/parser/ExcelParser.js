"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const XLSX = require("xlsx");
const weeksObject = require("../../config/daysWeekRange.json");
class ExcelParser {
    constructor(filePath) {
        this.filePath = filePath;
        this.readFile();
    }
    getFilePath() {
        return this.filePath;
    }
    readFile() {
        this.workbook = XLSX.readFile(this.filePath);
        this.fileReadReady = this.workbook.Sheets["Меню для рассылки"];
    }
    selectRangeFromSheet(randgeObject) {
        let range = randgeObject;
        var dataRange = [];
        for (let R = range.s.r; R <= range.e.r; ++R) {
            for (var C = range.s.c; C <= range.e.c; ++C) {
                var cell_address = { c: C, r: R };
                var data = XLSX.utils.encode_cell(cell_address);
                dataRange.push(this.fileReadReady[data]);
            }
        }
        return dataRange;
    }
    getRangeToObject(range) {
        return this.selectRangeFromSheet(this.converRangeObject(range));
    }
    getAllWeeksRangeToObject() {
        let parsedObjects = {};
        for (let key in weeksObject) {
            let object = this.getRangeToObject(weeksObject[key]);
            let foodArray = [];
            for (let index in object) {
                if (object[index] && object[index]['h']) {
                    foodArray.push(object[index]['h']);
                }
            }
            parsedObjects[key] = foodArray;
        }
        return parsedObjects;
    }
    getMenuByWeekDay(weekDayName) {
        let rangeObject = this.getRangeToObject(weeksObject[weekDayName]);
        let foodArray = [];
        for (let index in rangeObject) {
            if (rangeObject[index] && rangeObject[index]['h']) {
                foodArray.push(rangeObject[index]['h']);
            }
        }
        return foodArray;
    }
    converRangeObject(range) {
        range.s.c = this.getRowLetterNumber(range.s.c);
        range.e.c = this.getRowLetterNumber(range.e.c);
        range.s.r -= 1;
        range.e.r -= 1;
        return range;
    }
    getRowLetterNumber(letter) {
        let alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
        return alphabet.indexOf(letter.toLowerCase());
    }
}
exports.ExcelParser = ExcelParser;
//# sourceMappingURL=ExcelParser.js.map