// ! DEPENDENCIES
import * as database from 'mongoose';
import * as express from 'express';
import { red, blue } from 'chalk';
import { createServer } from 'http';
import { json as BodyParserJson } from 'body-parser';
import { config } from 'dotenv';
import { networkInterfaces } from 'os';
import { App } from './interfaces/app.interface';
import { loadRoutes } from './api/loadRoutes';

// ! SETUP
config();
const PORT = process.env.DEV == 'true' ? 4000 : process.env.PORT;
console.log(`[${red('INFO')}] Env variables loaded!`);

database.connect('mongodb://45.140.165.115:27017', {
	user: process.env.MONGO_PW,
	pass: process.env.MONGO_PW,
	useCreateIndex: false,
	useUnifiedTopology: true,
	useNewUrlParser: true,
});


// ! EXPRESS
const app: express.Application = express();
app.use(BodyParserJson());
app.use(express.json());
app.use((request: express.Request, response: express.Response, next: express.NextFunction): void => {
	response.header('Access-Control-Allow-Origin', '127.0.0.1');
	response.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Content-Type');
	next();
});

const _: App = {
	API: app,
	database: database,
	UUIDs: []
};
loadRoutes(_);

console.log(`[${red('INFO')}] Created express server on ip: ${blue(networkInterfaces().wlp3s0[1].address)}:${PORT}`);

createServer(app).listen(PORT);