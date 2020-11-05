// ! DEPENDENCIES
import * as mongoose from 'mongoose';
import * as express from 'express';
import { red, blue } from 'chalk';
import { createServer } from 'http';
import { json as BodyParserJson } from 'body-parser';
import { config } from 'dotenv';
import { networkInterfaces } from 'os';
import { App } from './interfaces/app.interface';
import { loadRoutes } from './api/loadRoutes';
import { load } from './loadModels';
import { saveData } from './saveToDatabase';

// ! SETUP
config();
const PORT = process.env.DEV == 'true' ? 4001 : process.env.PORT;
console.log(`[${red('INFO')}] Env variables loaded!`);

mongoose.connect('mongodb://45.140.165.115:27017', {
	user: process.env.MONGO_DB,
	pass: process.env.MONGO_PW,
	dbName: 'Inferium',
	useCreateIndex: true,
	useUnifiedTopology: true,
	useNewUrlParser: true,
});
mongoose.connection.once('open', (): void => {
	console.log(`[${red('INFO')}] Connected to database on ip: ${blue(networkInterfaces().wlp3s0[1].address)}:27017`);
	_.Collection = mongoose.connection.collection('members');
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
	database: mongoose,
	UUIDs: [],
	Models: {},
	Collection: null,
};

_.Models = load(_.database);

loadRoutes(_);

console.log(`[${red('INFO')}] Created express server on ip: ${blue(networkInterfaces().wlp3s0[1].address)}:${PORT}`);

setInterval(() => { saveData(_); }, 1000*600);

createServer(app).listen(PORT);