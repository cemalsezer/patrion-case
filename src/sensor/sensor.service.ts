import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SensorData } from './sensor-data.entity';

@Injectable()
export class SensorService {
  constructor(
    @InjectRepository(SensorData)
    private sensorRepo: Repository<SensorData>,
  ) {}

  async save(topic: string, message: string) {
    const data = this.sensorRepo.create({ topic, message });
    return this.sensorRepo.save(data);
  }
}
