import { Controller, Get, Render, Post, Req, Res, Body } from '@nestjs/common';
import { VijayService } from './vijay.service';
import {
  CUSTOMLOGOBASE64,
  MEMOPDF,
  RENDEREDOBJ,
  SIGNATUREBASE64,
  SLIPPDF,
  VARLCUSTOMHEADING,
  VARLLOGOBASE64,
} from 'src/constants/constant_variables';
import { Request, Response } from 'express';
import { CreateSlipDto } from 'src/common_dto/create_slip';
import { CreateMemoDto } from 'src/common_dto/create_memo';
import { PDFCreator } from 'src/services/create_pdf';
import { Readable } from 'node:stream';
import { readFile } from 'node:fs/promises';

@Controller('vijay')
export class VijayController {
  constructor(private readonly vijayService: VijayService) {}

  @Get('/memo')
  @Render('Vijay_memo')
  getVijayMemo() {
    return RENDEREDOBJ;
  }
  @Post('/memo')
  async createVijayMemo(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: CreateMemoDto,
  ) {
    const { Calculated_collection, Balance, Grand_total, Truck_number } = body;

    const Company_logo = await readFile(VARLLOGOBASE64, { encoding: 'utf-8' });

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
      Custom_heading: VARLCUSTOMHEADING,
      Custom_signature,
    };

    const pdfCreator = new PDFCreator(manipulatedBody, MEMOPDF);

    const stream = new Readable();

    const pdf = await pdfCreator.generatePDF();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${!Truck_number ? 'VARL_memo' : Truck_number}.pdf`,
    );
    res.setHeader('Content-Length', pdf.length);

    stream.push(pdf);
    stream.push(null);

    stream.pipe(res);
  }

  @Get('/slip')
  @Render('Vijay_slip')
  getVijaySlip() {
    return RENDEREDOBJ;
  }

  @Post('/slip')
  async createVijaySlip(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: CreateSlipDto,
  ) {
    const { Truck_number } = body;

    const Company_logo = await readFile(VARLLOGOBASE64, { encoding: 'utf-8' });

    const Custom_logo = await readFile(CUSTOMLOGOBASE64, { encoding: 'utf-8' });

    const Custom_signature = await readFile(SIGNATUREBASE64, {
      encoding: 'utf-8',
    });

    const manipulatedBody = {
      ...body,
      Company_logo,
      Custom_logo,
      Custom_heading: VARLCUSTOMHEADING,
      Custom_signature,
    };

    const pdfCreator = new PDFCreator(manipulatedBody, SLIPPDF);

    const stream = new Readable();

    const pdf = await pdfCreator.generatePDF('190mm', '210mm');

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${!Truck_number ? 'VARL_slip' : Truck_number}.pdf`,
    );
    res.setHeader('Content-Length', pdf.length);

    stream.push(pdf);
    stream.push(null);

    stream.pipe(res);
  }
}
