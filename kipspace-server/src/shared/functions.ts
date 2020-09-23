import { APP_NAME } from './constants';
import logger from './Logger';

interface Exception {
	code: number;
	message: string;
}

export const Exception = (function (this: Exception, code: number, message: string) {
	this.code = code;
	this.message = message;
} as unknown) as { new (code: number, message: string): Exception };

export const pErr = (err: Error): void => {
	if (err) {
		logger.error(err);
	}
};

export const getRandomInt = (): number => {
	return Math.floor(Math.random() * 1_000_000_000_000);
};

export const generateFilePath = (idPath: string, folder = '') => {
	const paths = folder.split('/:id');
	const destFolder =
		paths.length === 0 && paths[0].length === 0
			? `/${APP_NAME}`
			: paths.length === 0 && paths[0].length >= 1
			? `/${APP_NAME}/${folder}`
			: paths.length >= 1 && paths[1].length === 0
			? `/${APP_NAME}/${paths[0]}/${idPath}`
			: `/${APP_NAME}/${paths[0]}/${idPath}${paths[1]}`;

	return destFolder;
};
