import { Controller, Get, Render, Post, Req, Res, Body } from '@nestjs/common';
import { OtsService } from './ots.service';
import {
  CUSTOMLOGOBASE64,
  MEMOPDF,
  OTSCUSTOMHEADING,
  OTSLOGOBASE64,
  RENDEREDOBJ,
  SIGNATUREBASE64,
  SLIPPDF,
} from 'src/constants/constant_variables';
import { CreateSlipDto } from 'src/common_dto/create_slip';
import { CreateMemoDto } from 'src/common_dto/create_memo';
import { Request, Response } from 'express';
import { PDFCreator } from 'src/services/create_pdf';
import { Readable } from 'stream';
import { readFile } from 'fs/promises';

@Controller('ots')
export class OtsController {
  constructor(private readonly otsService: OtsService) {}

  @Get('/memo')
  @Render('Own_memo')
  getOTSMemo() {
    return RENDEREDOBJ;
  }

  @Post('/memo')
  async createOTSMemo(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: CreateMemoDto,
  ) {
    const { Calculated_collection, Balance, Grand_total, Truck_number } = body;

    const Company_logo = await readFile(OTSLOGOBASE64, { encoding: 'utf-8' });

    const Custom_logo = await readFile(CUSTOMLOGOBASE64, { encoding: 'utf-8' });

    const Custom_signature = await readFile(SIGNATUREBASE64, {
      encoding: 'utf-8',
    });

    const manipulatedBody = {
      ...body,
      Calculated_collection,
      Balance,
      Grand_total,
      Company_logo,
      Custom_logo,
      Custom_heading: OTSCUSTOMHEADING,
      Custom_signature,
    };

    const pdfCreator = new PDFCreator(manipulatedBody, MEMOPDF);

    const stream = new Readable();

    const pdf = await pdfCreator.generatePDF();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${!Truck_number ? 'OTS_memo' : Truck_number}.pdf`,
    );
    res.setHeader('Content-Length', pdf.length);

    stream.push(pdf);
    stream.push(null);

    stream.pipe(res);
  }

  @Get('/slip')
  @Render('Own_slip')
  getOTSSlip() {
    return RENDEREDOBJ;
  }

  @Post('/slip')
  async createOTSSlip(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: CreateSlipDto,
  ) {
    const { Truck_number } = body;

    const Company_logo = await readFile(OTSLOGOBASE64, { encoding: 'utf-8' });

    const Custom_logo = await readFile(CUSTOMLOGOBASE64, { encoding: 'utf-8' });

    const Custom_signature = await readFile(SIGNATUREBASE64, {
      encoding: 'utf-8',
    });

    const manipulatedBody = {
      ...body,
      Company_logo,
      Custom_logo,
      Custom_heading: OTSCUSTOMHEADING,
      Custom_signature,
    };

    const pdfCreator = new PDFCreator(manipulatedBody, SLIPPDF);

    const stream = new Readable();

    const pdf = await pdfCreator.generatePDF('190mm', '210mm');

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${!Truck_number ? 'OTS_slip' : Truck_number}.pdf`,
    );
    res.setHeader('Content-Length', pdf.length);

    stream.push(pdf);
    stream.push(null);

    stream.pipe(res);
  }
}
