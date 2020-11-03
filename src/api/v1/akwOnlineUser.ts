import { Request, Response, Router } from 'express';
import { App } from '../../interfaces/app.interface';
import { validator } from '@dr-fabian/minecraft-uuid-validator';

function onPlayerConnect(_: App): Router {
	const router: Router = Router();
	router.post('/onConnect', (request: Request, response: Response): void => {
		const { UUID } = request.body;
		if(!UUID) return response.status(403).json({ message: 'Missing UUID field! 🕊' }).end();
		if(!validator(UUID)) return response.status(400).json({ message: `${UUID} isn't a valid UUID! 🕊` }).end();
		_.UUIDs.push(UUID);
		return response.status(200).json({ message: 'Bip boop, done! 🦢' }).end();
	});
	return router;
}
export { onPlayerConnect };