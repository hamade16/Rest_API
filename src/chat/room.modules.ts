import { Controller, Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';

@Module({
  providers: [RoomService, ChatGateway],
  controllers: [RoomController]
})
export class RoomModule {}