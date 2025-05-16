import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { connect, MqttClient } from 'mqtt';
import { SensorService } from '../sensor/sensor.service';

@Injectable()
export class MqttService implements OnModuleInit {
  private client: MqttClient;
  private readonly logger = new Logger(MqttService.name);

  constructor(private readonly sensorService: SensorService) {}

  onModuleInit() {
    this.logger.log('🧪 MQTT service initialized');
    this.client = connect('mqtt://test.mosquitto.org');

    this.client.on('connect', () => {
      this.logger.log('✅ MQTT connected');
      this.client.subscribe('sensor/data', (err) => {
        if (err) this.logger.error('❌ Subscription failed', err.message);
        else this.logger.log('📡 Subscribed to sensor/data');
      });
    });

    this.client.on('message', async (topic, payload) => {
      const message = payload.toString();
      this.logger.log(`📩 MQTT Message — Topic: ${topic}, Message: ${message}`);

      
      try {
        await this.sensorService.save(topic, message);
        this.logger.log('💾 Sensor data saved to database');
      } catch (error) {
        this.logger.error('❌ Failed to save sensor data', error.message);
      }
    });
  }
}
