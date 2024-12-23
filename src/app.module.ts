import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AppEmitterController } from './app.emitter.controller';
import { AppManager } from './app.manager';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ClientsModule.register([
      {
        name: 'TRANSFROMER_PRODUCER',
        transport: Transport.KAFKA,
        options: {
          producerOnlyMode: true,
          client: {
            clientId: 'transformerProducer',
            brokers: ['localhost:9092'],
          }
        }
      },
    ]),
  ],
  controllers: [AppController, AppEmitterController],
  providers: [AppManager, AppService],
})
export class AppModule {}
