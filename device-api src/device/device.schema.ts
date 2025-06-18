import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Device extends Document {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  status!: string;

  @Prop()
  location?: string;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);