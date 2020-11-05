import * as mongoose from 'mongoose';
import { Player as PlayerInterface } from './interfaces/player.interface';

function load(mongodb: typeof mongoose): unknown {

	const Player = mongodb.model<PlayerInterface>('players', new mongodb.Schema({
		'UUID': {
			'type': String,
			'required': true,
			'unique': true
		},
		'NAME': {
			'type': String,
			'required': true
		},
		'RANK': {
			'type': Number,
			'required': true
		},
		'MONEY': {
			'type': Number,
			'required': true
		},
		'FRIENDS': {
			'type': [String],
			'required': true
		}
	}, {
		'_id': false,
		versionKey: false,
		timestamps: true,
		collection: 'members'
	}));

	return {
		Player
	};
}

export { load };