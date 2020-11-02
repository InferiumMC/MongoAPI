import { App } from '../interfaces/app.interface';
import { onPlayerConnect } from './v1/akwOnlineUser';

function loadRoutes(_: App): void {
	// ? Player Connection
	_.API.use('/api/v1/', onPlayerConnect(_));
}
export { loadRoutes };