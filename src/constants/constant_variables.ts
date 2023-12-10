import { PRODUCTION_URL } from 'src/env-config';
import { join } from 'node:path';

export const RENDEREDOBJ = {
  OTSMEMOURL: PRODUCTION_URL + '/ots/memo',
  OTSSLIPURL: PRODUCTION_URL + '/ots/slip',
  VIJAYANDRAMEMOURL: PRODUCTION_URL + '/vijay/memo',
  VIJAYANDRASLIPURL: PRODUCTION_URL + '/vijay/slip',
};

export const MEMOPDF = join(__dirname, '../', '../', 'views/memo_pdf.ejs');
export const SLIPPDF = join(__dirname, '../', '../', 'views/slip_pdf.ejs');

export const VijayMemoDocx = join(
  __dirname,
  '..',
  '..',
  '/public/VARL_memo.docx',
);
export const VijayLoadingSlipDocx = join(
  __dirname,
  '..',
  '..',
  '/public/VARL_Loading_Slip.docx',
);
export const OTSMemoDocx = join(__dirname, '..', '..', '/public/OTS_memo.docx');
export const OTSLoadingSlipDocx = join(
  __dirname,
  '..',
  '..',
  '/public/OTS_Loading_Slip.docx',
);

export const VARLLOGOBASE64 = join(
  __dirname,
  '../',
  '../',
  'public/VarlLogo.txt',
);

export const OTSLOGOBASE64 = join(
  __dirname,
  '../',
  '../',
  'public/OTSLogo.txt',
);

export const CUSTOMLOGOBASE64 = join(
  __dirname,
  '../',
  '../',
  'public/CustomLogo.txt',
);

export const SIGNATUREBASE64 = join(
  __dirname,
  '../',
  '../',
  'public/Signature.txt',
);

export const OTSCUSTOMHEADING = 'OWNER TRANSPORT SERVICES';

export const VARLCUSTOMHEADING = 'VIJAY ANDHRA ROADLINES';
