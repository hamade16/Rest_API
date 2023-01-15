
// import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway , WebSocketServer} from "@nestjs/websockets";
// import { AuthService } from "src/auth/auth.service";
// import { Socket } from 'socket.io'
// import { Server } from "http";
// import { PrismaService } from "src/prisma/prisma.service";
// import { RoomService } from "./room.service";

// @WebSocketGateway({
//     cors: {
//         origin: '*',
//     },
// })
// export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
//     @WebSocketServer()
//     server: Server;

//     constructor(private authservice: AuthService, private prisma: PrismaService, private roomservice: RoomService) {}

//     handleConnection() {
        
//         console.log('on connect');
//     }

//     handleDisconnect() {
//         console.log('disconnect');
//     }
//     // private disconnect (client: Socket)
//     // {
//     //     client.disconnect();
//     // }

// }