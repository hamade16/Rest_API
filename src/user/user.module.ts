import { Controller, Module } from '@nestjs/common';
import { ProfilesController } from './profile.controller';
import { socketEvents } from './socketEvents';
import { UserController } from './user.controller';
import { userService } from './user.service';

@Module({
  providers: [userService, socketEvents],
  controllers: [UserController, ProfilesController]
})
export class UserModule {}
