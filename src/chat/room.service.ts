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
            members: +userId
            }
        })
    }
}