import { App } from './interfaces/app.interface';
import fetch from 'node-fetch';
import { yellowBright, greenBright } from 'chalk';


async function saveData(_: App): Promise<void> {

	for(let i = 0; i < _.UUIDs.length; i++) {
		const data = await fetch('http://127.0.0.1:4000/api/v1/player', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ UUID: _.UUIDs[i] })
		});
		const json = await data.json();
		if(_.Models.Player.find({ UUID: _.UUIDs[i] })) {
			await _.Models.Player.updateOne({ UUID: _.UUIDs[i] }, { NAME: json.NAME, FRIENDS: json.FRIENDS, MONEY: json.MONEY, RANK: json.RANK });
      console.log(`
      ┌────────────────────────────────┐
      │\t\t   [${yellowBright('UPDATED')}]\t       │
      │\tUUID: ${_.UUIDs[i]},\t               │
      │\tNAME: ${json.NAME},\t               │
      │\tFRIENDS: ${json.FRIENDS},\t               │
      │\tMONEY: ${json.MONEY},\t               │
      |\tRANK: ${json.RANK}\t                       │
      └────────────────────────────────┘
      `);
		} else {
      await new _.Models.Player({ NAME: json.NAME, FRIENDS: json.FRIENDS, MONEY: json.MONEY, UUID: _.UUIDs[i], RANK: json.RANK }).save();
      console.log(`
      ┌────────────────────────────────┐
      │\t\t   [${greenBright('CREATED')}]\t       │
      │\tUUID: ${_.UUIDs[i]},\t               │
      │\tNAME: ${json.NAME},\t               │
      │\tFRIENDS: ${json.FRIENDS},\t               │
      │\tMONEY: ${json.MONEY},\t               │
      |\tRANK: ${json.RANK}\t                       │
      └────────────────────────────────┘
      `);
		}
	}


	return;
}

export { saveData };