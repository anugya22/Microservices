import { Injectable, OnModuleInit } from '@nestjs/common';
import { Channel, connect } from 'amqplib';
import * as fs from 'fs';
import * as csv from 'csv-parser';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';

interface DeviceRow {
  name: string;
  status: string;
  location?: string;
}

@Injectable()
export class BulkService implements OnModuleInit {
  private channel: Channel;

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    await this.connectToRabbitMQ();
  }

  async connectToRabbitMQ() {
    const uri = this.configService.get<string>('RABBITMQ_URI');
    const connection = await connect(uri);
    this.channel = await connection.createChannel();
    await this.channel.assertQueue('device_updates');
  }

  async processCsv(filePath: string): Promise<{ message: string }> {
    const devices: DeviceRow[] = [];

    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv.default()) 

        .on('data', (row: DeviceRow) => {
          devices.push(row);
        })
        .on('end', async () => {
          for (const device of devices) {
            this.channel.sendToQueue(
              'device_updates',
              Buffer.from(JSON.stringify(device)),
            );
          }
          resolve({ message: 'CSV processed and sent to queue' });
        })
        .on('error', reject);
    });
  }
}
