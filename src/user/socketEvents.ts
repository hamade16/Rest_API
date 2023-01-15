import { Param, Req, UseFilters } from "@nestjs/common";
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, ConnectedSocket, WsException, BaseWsExceptionFilter } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { Client } from "socket.io/dist/client";
import { PrismaService } from "src/prisma/prisma.service";

@UseFilters(new BaseWsExceptionFilter())
@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class socketEvents {
    constructor(private prisma: PrismaService) {}


    @WebSocketServer()
    server: Server;
    //type du socket
    //socket: conecting with client li sevatline;
    //io.sockets: connecting with ga3 lclient li kaynin
    //socket.brodcast: connecting with ga3 lclient li kaynin 
    //bla client li sevatline
    //connexion
     handleConnection(client: Socket){

        console.log(`Client connected: ${client.id}`);
        // console.log(typeof client.id);
       // console.log(req);
        
    }

    //deconexion
    handleDisconnect(client: Socket){
        console.log(`Client disConnected: ${client.id}`);
    }

    @SubscribeMessage('message')
    handleEvent(@MessageBody() data: string, @ConnectedSocket() client: Socket) {
        // envoyer un event
        //client.emit('message', client.id, data);
        client.broadcast.emit('message', client.id, data);
        //this.server.emit('message', client.id, data);
    }
}