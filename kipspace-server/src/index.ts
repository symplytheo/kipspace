import { PORT } from '@config';
import app from '@server';
import logger from '@shared/Logger';

// Start the server
const port = Number(PORT);
app.listen(port, () => {
	logger.info('MedFinder server started on port: ' + port);
});
