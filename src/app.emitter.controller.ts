import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { sleep } from './app.util';

@Controller()
export class AppEmitterController {
  constructor(
    private eventEmitter: EventEmitter2
) {}

  @EventPattern('test.request.topic')
    testTransformResponse(@Payload() request: any) {
    console.log("Received response from transformer message queue: ", request);
    this.eventEmitter.emit(request.header.session, request);
  }

}
