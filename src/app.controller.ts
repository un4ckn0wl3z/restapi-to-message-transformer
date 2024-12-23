import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Controller()
export class AppController {
  constructor(
    private eventEmitter: EventEmitter2,
    private readonly appService: AppService) {}

  @Post("test/transform")
  async testTransformRequest(@Body() request: any): Promise<any> {
    await this.appService.testTransform(request);
    const ack = await new Promise((resolve, reject) => {
      this.eventEmitter.on(request.id, (data) => {
        console.log("Received ack from transformer service: ", data);
        resolve(data);
      })
    });
    return ack;
  }

}
