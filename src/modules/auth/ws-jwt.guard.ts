import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const client: Socket = context.switchToWs().getClient<Socket>();
      const { token } = client.handshake?.auth;
      const payload = await this.jwtService.verify(token);
      context.switchToHttp().getRequest().user = payload;
      return Boolean(payload);
    } catch (err) {
      throw new WsException(err.message);
    }
  }
}
