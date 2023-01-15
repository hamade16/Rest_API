import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config'
import {AuthModule} from './auth/auth.module'
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { MulterModule } from '@nestjs/platform-express';
import { RoomModule } from './chat/room.modules';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), AuthModule, UserModule, PrismaModule, RoomModule,
    MulterModule.register({dest: './uploads'})],
})
export class AppModule {}
