import { Router, Request, Response } from 'express';
import { ExcelParser } from '../parser/ExcelParser'

const router: Router = Router();

router.get('/excel', (req: Request, res: Response) => {    
    let path = "./data/food.xlsx";    
    let parsedFile = new ExcelParser(path);    

// getRangeData({ s: { c: 0, r: 25 }, e: { c: 3, r: 30 } }
    //res.send(parsedFile.getRangeToObject("monday"));
    res.send(parsedFile.getAllWeeksRangeToObject());
});

/*router.get('/:name', (req: Request, res: Response) => {
    
    let { name } = req.params;

    res.send(`Hello, ${name}`);
});*/

export const ApiRoutes: Router = router;