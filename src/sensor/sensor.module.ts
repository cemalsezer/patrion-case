import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SensorData } from './sensor-data.entity';
import { SensorService } from './sensor.service';

@Module({
  imports: [TypeOrmModule.forFeature([SensorData])],
  providers: [SensorService],
  exports: [SensorService],
})
export class SensorModule {}
