import { Module } from '@nestjs/common';
import { VideoController } from './video.controller';
import { VideoWorker } from './video.worker';
import { BullModule } from '@nestjs/bullmq';
import { VideoToken } from './token.constanst';

@Module({
  controllers: [VideoController],
  providers: [VideoWorker],
  imports: [
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
      defaultJobOptions: {
        attempts: 3,
        removeOnComplete: 1000,
        removeOnFail: 3000,
        backoff: 2000,
      },
    }),
    BullModule.registerQueue({ name: VideoToken }),
  ],
  exports: [],
})
export class VideoModule {}
