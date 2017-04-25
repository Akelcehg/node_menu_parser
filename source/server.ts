import * as express from 'express'
import { ApiRoutes } from './routes/api_routes'

const app: express.Application = express();
const port: number = 3000;

app.use('/api', ApiRoutes);

//let router = express.Router();
/*
app.get ('/', function (req, res){
  res.send('Hello World!');
});*/

/*app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
*/
app.listen(port, () => {
    // Success callback
    console.log(`Listening at http://localhost:${port}/`);
});