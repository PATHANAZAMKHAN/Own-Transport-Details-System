import { parentPort, workerData } from 'node:worker_threads';
import { launch } from 'puppeteer-core';
import { PUPPETEER_ARGS } from '../constants/common.constants';
import { IPdfWorker } from '../constants/common.interface';

void (async () => {
	try {
		const { content, executablePath, height, width } = workerData as IPdfWorker;

		const browser = await launch({
			executablePath,
			args: PUPPETEER_ARGS,
		});

		const page = await browser.newPage();
		await page.setContent(content, { waitUntil: 'domcontentloaded' });

		const buffer = await page.pdf({
			height,
			width,
			printBackground: true,
			scale: 1,
		});

		await browser.close();

		parentPort?.postMessage(buffer);
	} catch (error) {
		if (error instanceof Error)
			parentPort?.postMessage({ error: error.message });
	}
})();
