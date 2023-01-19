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
        if (user.type === "public" || user.type === "private")
            await this.roomservice.CreateRoom(user.id, user.name, user.type);
        else
            await this.roomservice.CreateRoomprotected(user.id, user.name, user.type, user.password);
     }

     @Post('/addtoroom')
     async  addtoroom(@Body() user)
     {
        if (user.type === "public")
            await this.roomservice.addtoroom(user);
        else
            await this.roomservice.addtoroomprotected(user);
     }

     @Post('/addtoadmins')
     async  adduseradmins(@Body() user)
     {
        await this.roomservice.adduseradmins(user);
     }

     @Patch('/ban')
     async  banmember(@Body() user)
    {
        await this.roomservice.banmember(user);
    }


}