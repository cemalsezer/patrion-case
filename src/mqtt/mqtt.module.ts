import { Module } from '@nestjs/common';
import { MqttService } from './mqtt.service';
import { SensorModule } from '../sensor/sensor.module';

@Module({
  imports: [SensorModule],
  providers: [MqttService],
})
export class MqttModule {}
