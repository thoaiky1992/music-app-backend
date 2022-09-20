import {
  OnGatewayConnection,
  OnGatewayInit,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway()
export class AppGateWay implements OnGatewayConnection, OnGatewayInit {
  constructor(private jwtService: JwtService) {}

  server: Server;
  afterInit(server: Server): any {
    this.server = server;
    GlobalGateway.server = server;
  }

  async handleConnection(client: Socket) {
    // const { token } = client.handshake.auth;
    // if (token) {
    //   this.server.emit('socket', { title: 'Hello world' });
    //   const payload = await this.jwtService.verify(token);
    //   if (!payload) return false;
    // } else {
    //   return false;
    // }
  }
}

export class GlobalGateway {
  static server: Server;
}
