import * as mongoose from 'mongoose';
import { Application } from 'express';

interface App {
  database: typeof mongoose,
  API: Application,
  UUIDs: Array<string>,
  // eslint-disable-next-line semi
}

export { App };