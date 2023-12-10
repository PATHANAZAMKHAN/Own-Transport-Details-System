import { Module } from '@nestjs/common';
import { OtsModule } from './ots/ots.module';
import { VijayModule } from './vijay/vijay.module';

@Module({
  imports: [OtsModule, VijayModule],
})
export class AppModule {}
