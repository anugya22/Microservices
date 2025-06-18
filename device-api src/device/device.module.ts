import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DevicesService } from './device.service';
import { DevicesController } from './device.controller';
import { Device, DeviceSchema } from './device.schema';
import { RabbitMQModule } from '../rabbitmq/rabbitmq.module'; // ✅ Import this module

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Device.name, schema: DeviceSchema }]),
    RabbitMQModule, // ✅ Add RabbitMQModule so service can be injected
  ],
  providers: [DevicesService],
  controllers: [DevicesController],
})
export class DevicesModule {}
