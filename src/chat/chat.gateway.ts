
import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway , WebSocketServer} from "@nestjs/websockets";
import { AuthService } from "src/auth/auth.service";
import { Socket } from 'socket.io'
import { Server } from "http";
import { PrismaService } from "src/prisma/prisma.service";
import { RoomService } from "./room.service";
import { Body } from "@nestjs/common";

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    constructor(private prisma: PrismaService, private roomservice: RoomService) {}

    handleConnection() {
        
        console.log('on connect');
    }

    handleDisconnect() {
        console.log('disconnect');
    }
    @SubscribeMessage('message')
    async handlemessage(@MessageBody() Body, socket: Socket)
    {
        console.log(Body.roomId);
        //await socket.to(Body.roomId).emit('message', Body.message);
        await this.prisma.messages.create({
            data: {
                roomId: +Body.roomId,
                data: Body.data
            }
        })
    }
    // private disconnect (client: Socket)
    // {
    //     client.disconnect();
    // }

}