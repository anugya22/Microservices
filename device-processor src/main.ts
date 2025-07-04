import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URI!],
      queue: 'device_updates',
      queueOptions: {
        durable: true,
      },
    },
  });

  await app.listen();
  console.log('Device Processor is listening to RabbitMQ...');
}
bootstrap();
