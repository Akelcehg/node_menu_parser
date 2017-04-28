import * as XLSX from 'xlsx'
import * as fs from 'fs'
//import * as weeksObject from '../../config/daysWeekRange.json'

interface IRange {
    s: {
        c: any,
        r: number
    },
    e: {
        c: any,
        r: number
    },
}

class ExcelParser {

    private filePath: string;
    private fileReadReady;
    private workbook;

    constructor(filePath: string) {
        this.filePath = filePath;
        this.readFile();
    }

    public getFilePath(): string {
        return this.filePath;
    }

    public readFile() {
        this.workbook = XLSX.readFile(this.filePath);
        return this.fileReadReady = this.workbook.Sheets["Меню для рассылки"];
    }

    public selectRangeFromSheet(randgeObject: IRange) {
        let range: IRange = randgeObject;
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


    public getRangeToObject(range: IRange): Object {

        /*console.log ('--------------------------');
        console.log (range);
        console.log ('--------------------------');
        console.log (this.converRangeObject(range));
        console.log ('--------------------------');*/
        return this.selectRangeFromSheet(this.converRangeObject(range));
    }

    public getAllWeeksRangeToObject() {

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

    public getMenuByWeekDay(weekDayName: string) {
        let weeksObject = JSON.parse(fs.readFileSync(__dirname + '/../../config/daysWeekRange.json', 'utf8'));
        let rangeObject = this.getRangeToObject(weeksObject[weekDayName])
        let foodArray = [];
        for (let index in rangeObject) {
            if (rangeObject[index] && rangeObject[index]['h']) {
                foodArray.push(rangeObject[index]['h']);
            }
        }

        return foodArray;
    }

    private converRangeObject(range: IRange): IRange {

        let newRange = range;

        newRange.s.c = this.getRowLetterNumber(newRange.s.c);
        newRange.e.c = this.getRowLetterNumber(newRange.e.c);

        newRange.s.r -= 1;
        newRange.e.r -= 1;

        return newRange;
    }

    private getRowLetterNumber(letter: string) {
        let alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
        return alphabet.indexOf(letter.toLowerCase());
    }

}

export { ExcelParser }