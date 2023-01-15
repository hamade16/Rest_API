import { ForbiddenException, Injectable, UploadedFile } from "@nestjs/common";
import { async } from "rxjs";
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

@Injectable()
export class userService {
    constructor(private prisma: PrismaService){}
    async findProfile(id : number) {
        const id1 = await this.prisma.user.findUnique({
            where: {
                id: +id 
            },
        });
        if (!id1)
            throw new ForbiddenException('Credentials incorrect');
        return id1;
    }
    async   adduser(currentuser) {
        const id1 = await this.prisma.user.create({
            data: {
              email: currentuser.email,
              nickname: currentuser.nickname,
              username: currentuser.username,
              firstName: currentuser.firstName,
              lastName: currentuser.lastName,
              picturelink: currentuser.pictureLink
            }
          })
    }   
    async   updateuserinfo(id : number, currentuser) {
        const id1 = await this.prisma.user.update({
            where:{
                id: +id,
            },
            data: {
                email: currentuser.email,
                nickname:currentuser.nickname,
                username: currentuser.username,
                firstName: currentuser.firstName,
                lastName: currentuser.lastName
            }
       })
    }

    async   updatepicture(id: number, @UploadedFile() file: Express.Multer.File)
    {
        const id1 = await this.prisma.user.update({
            where:{
                id: +id,
            },
            data: {
                picturelink: file.path
            }
        })
    }

    async   getfriend(id: number) {
        const myfreinds = await this.prisma.user.findMany({
            where: {
                freinds: {

                }
            }
        })
        return myfreinds;
    }

    async   addfreind(user) {
        try
        {
            await this.prisma.freinds.create({
                data: {
                   userId: +user.id,
                   friendId: +user.freind 
                }
            })
            await this.prisma.freinds.create({
                data: {
                    userId: +user.freind,
                    friendId: +user.id
                }
            })
        }
        catch (error) {
            if (error instanceof PrismaClientKnownRequestError)
            {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Credentials taken');
                }
            }
            throw error;
        }
    }

    async unfriend(user){
        await this.prisma.freinds.deleteMany({
            where: {
                AND: [
                    {userId: +user.id},
                    {friendId: +user.freind}
                ]
            }
            
        })
        await this.prisma.freinds.deleteMany({
            where: {
                AND: [
                    {userId: +user.freind},
                    {friendId: +user.id}
                ]
            }
            
        })
    }
}