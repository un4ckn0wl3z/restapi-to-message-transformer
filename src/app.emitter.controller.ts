import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Controller()
export class AppEmitterController {
  constructor(
    private eventEmitter: EventEmitter2
) {}

private emitAsync(session: string, request: any): Promise<void> {
  return new Promise((resolve) => {
      this.eventEmitter.emit(session, request);
      resolve();
  });
}

  @EventPattern('test.request.topic')
    testTransformResponse(@Payload() request: any) {
      try {
        console.log("Received response from transformer message queue: ", request);
        this.emitAsync(request.header.session, request);
      } catch (error) {
        console.error("Error processing response from transformer message queue: ", error);
      }
  }

}
