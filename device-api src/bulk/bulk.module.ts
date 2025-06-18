import { Module } from '@nestjs/common';
import { BulkController } from './bulk.controller';
import { BulkService } from './bulk.service';
import { DevicesModule } from '../device/device.module';

@Module({
  imports: [DevicesModule],
  controllers: [BulkController],
  providers: [BulkService],
})
export class BulkModule {}
