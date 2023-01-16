import { ForbiddenException, Injectable} from "@nestjs/common";
import { async } from "rxjs";
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";


@Injectable()
export class RoomService {
    constructor(private prisma: PrismaService) {}
    async getRoomsForUser(){
        let allRooms = [];

        const rooms = await this.prisma.room.findMany();
        rooms.forEach(element => {
            let obj = {
                id: element.id,
                admins: element.admins,
                members: element.members,
                name: element.name
                
            }
            allRooms.push(obj);
        });
        return allRooms;
    }

    async CreateRoom(userId: number, name: string) {
        const id1 = await this.prisma.room.create({
        data: {
                name: name,
                admins: +userId,
                members: +userId,
                owner: +userId
            }
        })
    }

    async addtoroom(user: any) {
        const rooms = await this.prisma.room.findUnique({
            where: {
                name: user.name
            }
        });
       const id1 =  rooms.members.find((id) => id==user.id)
       if (id1)
        throw new ForbiddenException('already members');
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

    async   adduseradmins(user: any)
    {
        const rooms = await this.prisma.room.findUnique({
            where: {
                name: user.name
            }
        });
        if (rooms.owner != user.admin_id)
          throw new ForbiddenException('is not owner');
        const id1 =  rooms.admins.find((id) =>id==user.user_id)
        if (id1)
            throw new ForbiddenException('already admins');
            const r = await this.prisma.room.findUnique({
                where: {
                    name: user.name
                }
            });
           const id2 =  rooms.members.find((id) =>id==user.user_id)
           if (!id2)
            throw new ForbiddenException('is not member');
        const userUpdate = await this.prisma.room.update({
            where: {
              name: user.name,
            },
            data: {
              admins: {
                push: +user.user_id,
              },
            },
          })
    }

    async   banmember(user: any)
    {
        const rooms = await this.prisma.room.findUnique({
            where: {
              name: user.name
            }
          })
          const id1 =  rooms.admins.find((id) =>id==user.admin_id)
          if (!id1)
              throw new ForbiddenException('is Not admins');
          const id2 = rooms.admins.find((id) =>id==user.user_id)
          if (id2 && rooms.owner != user.admin_id)
            throw new ForbiddenException('you are not owner, impossiple to remove admin');
            const userUpdate = await this.prisma.room.update({
            where: {
             name: user.name
            },
            data: {
              members: {
                set: rooms.members.filter((id) => id != user.user_id)
                }
              }
          })
          if (id2)
          {
            const adminupdate = await this.prisma.room.update({
              where: {
               name: user.name
              },
              data: {
                admins: {
                  set: rooms.admins.filter((id) => id != user.user_id)
                  }
                }
            })
          }
        }
}