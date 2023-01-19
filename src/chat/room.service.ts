import { ForbiddenException, Injectable} from "@nestjs/common";
import { async } from "rxjs";
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { comparepassword, hashPassword} from "./utils/bcrypt";
import moment from "moment";


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
                name: element.name,
                type: element.type,
                owner: element.owner
                
            }
            if (obj.type === "public" || obj.type === "protected")
              allRooms.push(obj);
        });
        return allRooms;
    }

    async CreateRoom(userId: number, name: string, type: string) {
      const rooms = await this.prisma.room.findUnique({
        where: {
            name: name
        }
    });
    if (rooms)
      throw new ForbiddenException('name existe'); 
    const id1 = await this.prisma.room.create({
          data: {
                  name: name,
                  admins: +userId,
                  members: +userId,
                  owner: +userId,
                  type: type
              }
          })
    }

    async CreateRoomprotected(userId: number, name: string, type: string, password: string){
      const rooms = await this.prisma.room.findUnique({
        where: {
            name: name
        }
    });
    if (rooms)
      throw new ForbiddenException('name existe');
    const rawPassword = await hashPassword(password);
    const id1 = await this.prisma.room.create({
      data: {
              name: name,
              admins: +userId,
              members: +userId,
              owner: +userId,
              type: type,
              hash: rawPassword
          }
      })
    }

    async addtoroom(user: any) {
        const rooms = await this.prisma.room.findUnique({
            where: {
                name: user.name
            }
        });
        const id_ban = rooms.blocked.find((id) => id==user.id)
        if (id_ban)
          throw new ForbiddenException('user banned');
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

    async addtoroomprotected(user: any) {
      const rooms = await this.prisma.room.findUnique({
          where: {
              name: user.name
          }
      });
      const matched = comparepassword(user.password, rooms.hash);
      if (!matched)
        throw new ForbiddenException('password incorrect');
      const id_ban = rooms.blocked.find((id) => id==user.id)
      if (id_ban)
        throw new ForbiddenException('user banned');
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
          const addtoblock = await this.prisma.room.update({
            where: {
              name: user.name,
            },
            data: {
              blocked: {
                push: +user.user_id,
              },
            },
          })
        }

        async muteduser(user) {
          await this.prisma.muted.create({
            data: {
              roomId: user.roomId,
              userId: user.id,
              time: moment().add(user.value).toString()
            }
          })
        }
}