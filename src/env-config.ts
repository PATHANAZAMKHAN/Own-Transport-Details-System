import { config } from 'dotenv';
config();
export const PRODUCTION_URL = process.env.PRODUCTION_URL!;
export const DEVELOPMENT_URL = process.env.DEVELOPMENT_URL!;
