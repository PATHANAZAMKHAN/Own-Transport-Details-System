import { parentPort, workerData } from 'node:worker_threads';
import { launch } from 'puppeteer-core';
import { PUPPETEER_ARGS } from '../constants/common.constants';
import { IPdfWorker } from '../constants/common.interface';

const MM_PER_INCH = 25.4;
const CSS_PX_PER_INCH = 96;
const LAYOUT_TOLERANCE_PX = 1;

const mmToCssPx = (dimension: string): number => {
	const match = dimension.trim().match(/^([\d.]+)mm$/);

	if (!match) {
		throw new Error(
			`Unsupported PDF dimension "${dimension}". Use millimeters.`,
		);
	}

	return (Number(match[1]) * CSS_PX_PER_INCH) / MM_PER_INCH;
};

void (async () => {
	try {
		const { content, executablePath, height, width } = workerData as IPdfWorker;
		const viewport = {
			width: Math.ceil(mmToCssPx(width)),
			height: Math.ceil(mmToCssPx(height)),
			deviceScaleFactor: 1,
		};

		const browser = await launch({
			executablePath,
			args: PUPPETEER_ARGS,
		});

		const page = await browser.newPage();
		await page.setViewport(viewport);
		await page.setContent(content, { waitUntil: 'load' });
		await page.evaluate(async () => {
			await document.fonts.ready;

			await Promise.all(
				Array.from(document.images).map((image) => {
					if (image.complete && image.naturalWidth > 0)
						return Promise.resolve();

					return new Promise((resolve) => {
						image.addEventListener('load', resolve, { once: true });
						image.addEventListener('error', resolve, { once: true });
					});
				}),
			);
		});

		const layout = await page.evaluate(() => ({
			bodyScrollHeight: document.body.scrollHeight,
			bodyOffsetHeight: document.body.offsetHeight,
			htmlScrollHeight: document.documentElement.scrollHeight,
			htmlOffsetHeight: document.documentElement.offsetHeight,
			bodyScrollWidth: document.body.scrollWidth,
			bodyOffsetWidth: document.body.offsetWidth,
			htmlScrollWidth: document.documentElement.scrollWidth,
			htmlOffsetWidth: document.documentElement.offsetWidth,
		}));
		const maxHeight = viewport.height + LAYOUT_TOLERANCE_PX;

		if (
			layout.bodyScrollHeight > maxHeight ||
			layout.htmlScrollHeight > maxHeight
		) {
			throw new Error(
				`PDF content exceeds one page. Page height: ${viewport.height}px; layout: ${JSON.stringify(
					layout,
				)}`,
			);
		}

		const buffer = await page.pdf({
			height,
			width,
			margin: {
				top: 0,
				right: 0,
				bottom: 0,
				left: 0,
			},
			preferCSSPageSize: true,
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
