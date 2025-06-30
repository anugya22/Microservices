import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { DevicesModule } from './device/device.module';
import { BulkModule } from './bulk/bulk.module';
import { RabbitMQModule } from './rabbitmq/rabbitmq.module';
import { SearchModule } from './search/search.module'; 

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

   
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),

   
    AuthModule,
    DevicesModule,
    BulkModule,
    RabbitMQModule,

    
    SearchModule,
  ],
})
export class AppModule {}
