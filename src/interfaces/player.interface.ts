import { Document } from 'mongoose';

interface Player extends Document{
  UUID      : string,
  NAME      : string,
  RANK      : number,
  MONEY     : number,
  FRIENDS   : Array<string>,
  // eslint-disable-next-line semi
}

export { Player };