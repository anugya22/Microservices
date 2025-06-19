import * as amqp from 'amqplib';
import * as mongoose from 'mongoose';

const deviceSchema = new mongoose.Schema({
  name: String,
  status: String,
  location: String,
});

const Device = mongoose.model('Device', deviceSchema);

async function bootstrap() {
  await mongoose.connect('mongodb://localhost:27017/device_db'); 

  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  const queue = 'device_updates';

  await channel.assertQueue(queue, { durable: true });
  console.log('Device Processor is listening to RabbitMQ...');

  channel.consume(queue, async (msg) => {
    if (msg) {
      const deviceData = JSON.parse(msg.content.toString());
      console.log('Received device data:', deviceData);

      await Device.create(deviceData); // Insert into MongoDB
      channel.ack(msg);
    }
  });
}

bootstrap().catch(console.error);
