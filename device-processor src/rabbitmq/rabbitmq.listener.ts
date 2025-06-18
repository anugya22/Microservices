import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { DeviceService } from '../devices/devices.service';

@Controller()
export class RabbitMqListener {
  constructor(private readonly deviceService: DeviceService) {}

  @EventPattern('bulk_device_update')
  async handleDeviceUpdate(@Payload() data: any[]) {
    await this.deviceService.bulkUpdate(data);
  }
}
