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
    import { UserDto } from "./dto";
    import { extname } from 'path';
import { userService } from './user.service';

    @Controller('profiles')
    export class ProfilesController {
        constructor(private prisma: PrismaService, private userservice: userService) {}
        @Get(':id')
        async GetProfile(@Param('id') id: number){
            return this.userservice.findProfile(id);
        }
        @Post()
        async AddUser(@Body() currentuser) {
            this.userservice.adduser(currentuser);
        }
        @Patch(':id')
        async UpdateProfile(@Param('id') id: number ,@Body() currentuser) {
            
            this.userservice.updateuserinfo(id, currentuser);
        }

        @Patch('picture/:id')
        @UseInterceptors(FileInterceptor('file', {
            storage: diskStorage({
                destination: './files',
                filename: (req, file, callback) => {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    const ext = extname(file.originalname);
                    const filename = `${uniqueSuffix}${ext}`;
                    callback(null, filename)
                }
            })
        }))
        async UpdatePicture(@Param('id') id: number, @UploadedFile() file: Express.Multer.File)
        {
            this.userservice.updatepicture(id, file);
        }

        @Get('/getfriend/:id')
        async   getFreinds(@Param('id') id: number)
        {
            return this.userservice.getfriend(id);
        }
        @Post('/addfreind')
        async addfriend(@Body() user)
        {
            this.userservice.addfreind(user)
            const id1 = await this.prisma.freinds.findFirst ({
                where: {
                    userId: +user.id,
                    friendId : +user.freind,
                    
                }
            })
            if (id1)
                throw new ForbiddenException('already freinds');
            this.userservice.addfreind(user)
        }

        @Delete('/unfriend')
        async   unfriend (@Body() user)
        {
            this.userservice.unfriend(user);
        }
    }