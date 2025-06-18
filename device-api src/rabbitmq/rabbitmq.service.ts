import { Injectable, OnModuleInit } from '@nestjs/common';
import { connect, Channel, Connection } from 'amqplib';

@Injectable()
export class RabbitMQService implements OnModuleInit {
  private channel: Channel;

  async onModuleInit() {
    const connection: Connection = await connect('amqp://localhost');
    this.channel = await connection.createChannel();
    await this.channel.assertQueue('device_updates', { durable: true }); // ✅ durable
  }

  publishToQueue(message: any) {
    const buffer = Buffer.from(JSON.stringify(message));
    this.channel.sendToQueue('device_updates', buffer, { persistent: true }); // ✅ persistent
  }
}
