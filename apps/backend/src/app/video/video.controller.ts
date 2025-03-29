import { InjectQueue } from "@nestjs/bullmq";
import { Body, Controller, Get, Post } from "@nestjs/common";
import { VideoToken } from "./token.constanst";
import { Queue } from "bullmq";

@Controller('videos')
export class VideoController{
  constructor(
    @InjectQueue(VideoToken) private readonly videoQueueService: Queue
  ){}
  
  @Get()
  async getVideos(){
    return []
  }

  @Post('process')
  async processVideo(@Body() processData: any){
    // const processData = {fileName: 'my-video', fileType: 'mp4', fileSize: '3MB'}
    const val  = await this.videoQueueService.add('process_video', processData, {delay: 3000})
    console.log(val)
    return 'Video is processing!' 
  }
}