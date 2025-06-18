import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Device } from './device.schema';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service'; // 👈 Import

@Injectable()
export class DevicesService {
  constructor(
    @InjectModel(Device.name) private model: Model<Device>,
    private readonly rabbitmqService: RabbitMQService // 👈 Inject
  ) {}

  async create(dto: CreateDeviceDto) {
    const device = await this.model.create(dto);
    // 👇 Publish device to RabbitMQ
    this.rabbitmqService.publishToQueue({
      type: 'device_created',
      data: device,
    });
    return device;
  }

  findAll() {
    return this.model.find().exec();
  }

  async findOne(id: string) {
    const device = await this.model.findById(id).exec();
    if (!device) throw new NotFoundException('Device not found');
    return device;
  }

  async update(id: string, dto: UpdateDeviceDto) {
    const updated = await this.model.findByIdAndUpdate(id, dto, { new: true }).exec();
    if (!updated) throw new NotFoundException('Device not found');
    return updated;
  }

  async remove(id: string) {
    const result = await this.model.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Device not found');
    return result;
  }
}
