"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ExcelParser_1 = require("../parser/ExcelParser");
const router = express_1.Router();
router.get('/excel', (req, res) => {
    let path = "./data/food.xlsx";
    let parsedFile = new ExcelParser_1.ExcelParser(path);
    // getRangeData({ s: { c: 0, r: 25 }, e: { c: 3, r: 30 } }
    //res.send(parsedFile.getRangeToObject("monday"));
    res.send(parsedFile.getAllWeeksRangeToObject());
});
/*router.get('/:name', (req: Request, res: Response) => {
    
    let { name } = req.params;

    res.send(`Hello, ${name}`);
});*/
exports.ApiRoutes = router;
//# sourceMappingURL=api_routes.js.map