import { Module } from '@nestjs/common';
import { VijayService } from './vijay.service';
import { VijayController } from './vijay.controller';

@Module({
  controllers: [VijayController],
  providers: [VijayService],
})
export class VijayModule {}
