import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DeviceService } from './devices/devices.service';
import { Device, DeviceSchema } from './devices/devices.schema';
import { RabbitMqListener } from './rabbitmq/rabbitmq.listener';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI!),
    MongooseModule.forFeature([{ name: Device.name, schema: DeviceSchema }]),
  ],
  providers: [DeviceService, RabbitMqListener],
})
export class AppModule {}
