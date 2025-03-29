import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database';
import { BullModule } from '@nestjs/bullmq';
@Module({
  imports: [
    DatabaseModule,
     BullModule.forRoot({
      connection: {
        host: ' ',
        port: 6379,
        
      }, defaultJobOptions: {attempts: 3}}),
      BullModule.registerQueue({name: 'video'})
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
