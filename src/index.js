import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import compression from 'compression'
import helmet from "helmet";
import fs from 'fs'


const swaggerFile = JSON.parse(fs.readFileSync('./swagger-output.json', 'utf-8'));

import authRouter from './routes/auth.route.js'
import demoRouter from './routes/login.route.js'

const app = express()
const port = process.env.PORT

app.use(cors());
app.use(express.json());
app.use(compression());
app.use(helmet());

app.use('/api/v1', demoRouter);
app.use('/api/v1', authRouter);

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerFile));

console.clear();
console.log("*************************************************");
console.log("*API LOGIN                                       *");
console.log("*************************************************");

app.listen(port, () => console.log('http://localhost:' + port));
