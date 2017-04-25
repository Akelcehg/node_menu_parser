import * as XLSX from 'xlsx'
import * as weeksObject from '../../config/daysWeekRange.json'

/*
interface IRangeChildren {
     c: Number, 
     r: Number 
}*/

interface IRange {
    //s: { c: 0, r: 25 }, e: { c: '3', r: 30 } 

    s: {
        c: any,
        r: number
    },
    e: {
        c: any,
        r: number
    },
    //e : IRangeChildren,
}

class ExcelParser {

    private filePath: string;
    private fileReadReady;
    private workbook;
    //private rengedData : Array<any>;

    constructor(filePath: string) {
        this.filePath = filePath;
        this.readFile();
    }

    public getFilePath(): string {
        return this.filePath;
    }
    /*
        public getRengedData() {
            return this.rengedData;
        }
    */
    public readFile() {
        this.workbook = XLSX.readFile(this.filePath);
        this.fileReadReady = this.workbook.Sheets["Меню для рассылки"];
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
        return this.selectRangeFromSheet(this.converRangeObject(range));
    }

    public getAllWeeksRangeToObject() {

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

    private converRangeObject(range: IRange): IRange {

        range.s.c = this.getRowLetterNumber(range.s.c);
        range.e.c = this.getRowLetterNumber(range.e.c);

        range.s.r -= 1;
        range.e.r -= 1;

        return range;
    }

    private getRowLetterNumber(letter: string) {
        let alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
        return alphabet.indexOf(letter.toLowerCase());
    }

}

export { ExcelParser }