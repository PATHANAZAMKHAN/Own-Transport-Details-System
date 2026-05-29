import { join } from 'node:path';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Test, TestingModule } from '@nestjs/testing';
import { renderFile } from 'ejs';
import request from 'supertest';
import { TEMPLATE_FILE_PATHS } from '../src/constants/common.constants';
import { AppModule } from '../src/modules/app.module';
import { CacheLogoService } from '../src/providers/cacheLogo.service';
import { createRenderServiceStub } from './__stubs__/renderService.stub';
import { slipStub } from './__stubs__/slip.stub';
import { countPdfPages } from './__utils__/pdf.util';

describe('SlipModule (e2e)', () => {
	let app: NestExpressApplication;
	let webUrl: string;

	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
			providers: [
				CacheLogoService,
				{
					provide: APP_PIPE,
					useFactory: () =>
						new ValidationPipe({
							transform: true,
							whitelist: true,
							forbidNonWhitelisted: true,
							transformOptions: {
								enableImplicitConversion: true,
							},
						}),
				},
			],
		}).compile();

		app = moduleFixture.createNestApplication<NestExpressApplication>();

		app.useStaticAssets(join('public'));

		app.setBaseViewsDir(join('views'));

		app.setViewEngine('ejs');

		await app.init();

		// Get WEB_URL from ConfigService
		const configService = moduleFixture.get<ConfigService>(ConfigService);
		webUrl = configService.get<string>('WEB_URL') || 'http://localhost:3000';
	});

	afterAll(async () => {
		await app.close();
	});

	//? Slip API Test cases
	it('/slip/ots (GET)', async () => {
		const otsSlipEjs = await renderFile(
			TEMPLATE_FILE_PATHS.OTS_SLIP,
			createRenderServiceStub(webUrl),
		);

		const otsSlipResponse = await request(app.getHttpServer())
			.get('/slip/ots')
			.expect(200);

		expect(otsSlipResponse.text).toBe(otsSlipEjs);
		expect(otsSlipResponse.headers['content-type']).toBe(
			'text/html; charset=utf-8',
		);
	});

	it('/slip/vijay (GET)', async () => {
		const vijaySlipEjs = await renderFile(
			TEMPLATE_FILE_PATHS.VIJAY_SLIP,
			createRenderServiceStub(webUrl),
		);

		const vijaySlipResponse = await request(app.getHttpServer())
			.get('/slip/vijay')
			.expect(200);

		expect(vijaySlipResponse.text).toBe(vijaySlipEjs);
		expect(vijaySlipResponse.headers['content-type']).toBe(
			'text/html; charset=utf-8',
		);
	});

	it('/slip/ots (POST)', async () => {
		const otsSlipResponse = await request(app.getHttpServer())
			.post('/slip/ots')
			.send(slipStub)
			.expect(201);

		expect(otsSlipResponse.headers['content-type']).toBe('application/pdf');
		expect(otsSlipResponse.headers['content-disposition']).toContain(
			`attachment; filename=${slipStub.Truck_number}.pdf`,
		);

		const receivedBuffer = otsSlipResponse.body as Buffer;
		expect(receivedBuffer.length).toBeGreaterThan(0);
		expect(countPdfPages(receivedBuffer)).toBe(1);
	}, 10000);

	it('/slip/vijay (POST)', async () => {
		const vijaySlipResponse = await request(app.getHttpServer())
			.post('/slip/vijay')
			.send(slipStub)
			.expect(201);

		expect(vijaySlipResponse.headers['content-type']).toBe('application/pdf');
		expect(vijaySlipResponse.headers['content-disposition']).toContain(
			`attachment; filename=${slipStub.Truck_number}.pdf`,
		);

		const receivedBuffer = vijaySlipResponse.body as Buffer;
		expect(receivedBuffer.length).toBeGreaterThan(0);
		expect(countPdfPages(receivedBuffer)).toBe(1);
	}, 10000);
});
