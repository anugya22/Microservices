import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Device } from './devices.schema';
import { Model } from 'mongoose';

@Injectable()
export class DeviceService {
  constructor(@InjectModel(Device.name) private model: Model<Device>) {}

  async bulkUpdate(devices: any[]) {
    for (const device of devices) {
      await this.model.findOneAndUpdate(
        { name: device.name }, 
        { $set: device },
        { upsert: true, new: true }
      );
      Logger.log(`Device ${device.name} updated`);
    }
  }
}
