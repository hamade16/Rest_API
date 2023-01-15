import {Controller,
    Get,
    Param,
    ForbiddenException,
    NotFoundException,
    Post,
    Patch,
    Delete,
    Req,
    Body,
    Query,
    UseInterceptors,
    UploadedFile} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { PrismaService } from "src/prisma/prisma.service";
import { ChatDto } from "./dto";
import { extname } from 'path';
import { RoomService } from './room.service';
import { prisma } from '@prisma/client';


@Controller('Rooms')
export class RoomController
{
    constructor(private prisma: PrismaService, private roomservice: RoomService) {}
    @Get()
    async getRoomsForUser()
    {
        return await this.roomservice.getRoomsForUser();
    }

    @Post('createroom')
    async CreateRoom(@Body() user) {
        await this.roomservice.CreateRoom(user.id, user.name);
     }

     @Post('/addtoroom')
     async  addtoroom(@Body() user)
     {
        const userUpdate = await this.prisma.room.update({
            where: {
              name: user.name,
            },
            data: {
              members: {
                push: +user.id,
              },
            },
          })
     }

     @Post('/addtoadmins')
     async  addtoaddmins(@Body() user)
     {
        const userUpdate = await this.prisma.room.update({
            where: {
              name: user.name,
            },
            data: {
              admins: {
                push: +user.id,
              },
            },
          })
     }


}