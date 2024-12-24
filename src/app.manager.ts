import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { AppService } from "./app.service";
import { Response } from 'express';

@Injectable()
export class AppManager {
      constructor(
        private eventEmitter: EventEmitter2,
        private readonly appService: AppService
      ) {}

    async handleTestTransformRequest(request: any, response: Response): Promise<any> {
      try {
        await this.appService.testTransform(request);
        const ack = await new Promise((resolve, reject) => {
          this.eventEmitter.on(request.header.session, (data) => {
            console.log("Received ack from transformer service: ", data);
            resolve(data);
          })
        });
        return response.status(200).json(ack);
      } catch (error) {
        return response.status(400).json({ error: error.message });
      }
      }
}