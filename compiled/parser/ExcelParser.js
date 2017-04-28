"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const XLSX = require("xlsx");
const fs = require("fs");
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
        return this.fileReadReady = this.workbook.Sheets["Меню для рассылки"];
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
        /*console.log ('--------------------------');
        console.log (range);
        console.log ('--------------------------');
        console.log (this.converRangeObject(range));
        console.log ('--------------------------');*/
        return this.selectRangeFromSheet(this.converRangeObject(range));
    }
    getAllWeeksRangeToObject() {
        let parsedObjects = {};
        let weeksObject = JSON.parse(fs.readFileSync(__dirname + '/../../config/daysWeekRange.json', 'utf8'));
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
        let weeksObject = JSON.parse(fs.readFileSync(__dirname + '/../../config/daysWeekRange.json', 'utf8'));
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
        let newRange = range;
        newRange.s.c = this.getRowLetterNumber(newRange.s.c);
        newRange.e.c = this.getRowLetterNumber(newRange.e.c);
        newRange.s.r -= 1;
        newRange.e.r -= 1;
        return newRange;
    }
    getRowLetterNumber(letter) {
        let alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
        return alphabet.indexOf(letter.toLowerCase());
    }
}
exports.ExcelParser = ExcelParser;
//# sourceMappingURL=ExcelParser.js.map