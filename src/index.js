import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import compression from 'compression'
import helmet from "helmet";
import fs from 'fs'


const swaggerFile = JSON.parse(fs.readFileSync('./swagger-output.json', 'utf-8'));

import tokenRouter from './routes/auth.route.js'
import configurationRouter from './routes/configuration.route.js'
import loginRouter from './routes/login.route.js'



const app = express()
const port = process.env.PORT

app.use(cors());
app.use(express.json());
app.use(compression());
app.use(helmet());


app.use('/api/v1', tokenRouter);
app.use('/api/v1', loginRouter);
app.use('/api/v1', configurationRouter);



app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerFile));

console.clear();
console.log("*************************************************");
console.log("*API AGRISOFT                                       *");
console.log("*************************************************");

app.listen(port, () => console.log('http://localhost:' + port));
