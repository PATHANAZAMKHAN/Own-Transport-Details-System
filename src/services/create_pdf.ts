import { CreateMemoDto } from 'src/common_dto/create_memo';
import { CreateSlipDto } from 'src/common_dto/create_slip';
import { launch, executablePath } from 'puppeteer';
import { renderFile } from 'ejs';

export class PDFCreator {
  constructor(
    private ObjectToInject: CreateMemoDto | CreateSlipDto,
    private filePathToRead: string,
  ) {
    this.ObjectToInject = ObjectToInject;
    this.filePathToRead = filePathToRead;
  }

  async generatePDF(Custom_height?: string, Custom_width?: string) {
    const template = await renderFile(this.filePathToRead, this.ObjectToInject);

    const browser = await launch({
      headless: 'new',
      args: [
        '--disable-setuid-sandbox',
        '--no-sandbox',
        '--single-process',
        '--no-zygote',
      ],
      executablePath:
        process.env.NODE_ENV === 'production'
          ? process.env.PUPPETEER_EXECUTABLE_PATH
          : executablePath(),
    });
    const page = await browser.newPage();
    await page.setContent(template, { waitUntil: 'domcontentloaded' });

    const pdfBuffer = await page.pdf({
      width: Custom_width ?? '260mm',
      height: Custom_height ?? '296mm',
    });

    await browser.close();
    return pdfBuffer;
  }
}
