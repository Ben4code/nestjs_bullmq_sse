import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { VideoToken } from './token.constanst';
import { Job } from 'bullmq';

@Processor(VideoToken, {
  concurrency: 3,
  limiter: { duration: 10000, max: 10 }, 
})
export class VideoWorker extends WorkerHost {
  async process(job: Job) {
    const totalSteps = 5;
    let cb = () => {
      return;
    };

    const jobTimeout = (cb: (value: string) => void) =>
      setTimeout(() => cb('done'), 5000);

    for (let step = 1; step <= totalSteps; step++) {
      await new Promise((resolve, _reject) => jobTimeout(resolve));
      const progress = Math.round((step / totalSteps) * 100);
      await job.updateProgress(progress);
    }

    clearTimeout(jobTimeout(cb));
    // throw new Error('File corrupted')
  }

  @OnWorkerEvent('progress')
  onJobProgress(job: Job) {
    console.log(`JobId ${job.id} is ${job.progress}% completed`);
  }

  @OnWorkerEvent('active')
  onJobActive(job: Job) {
    console.log('Retrived JobId ', job.id);
  }

  @OnWorkerEvent('completed')
  onJobComplete(job: Job) {
    console.log('JobId:', job.id, 'process complete');
  }

  @OnWorkerEvent('failed')
  onJobFailed(job: Job) {
    console.log('JobId:', job.id, 'process failed ');
    console.log('Attempt number: ', job.attemptsMade);
  }
}
