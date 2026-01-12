import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  Injectable,
} from '@nestjs/common';
import { UsersService } from '../users.service';

interface SessionData {
  color?: string;
  userId?: number;
}

interface RequestWithSession extends Request {
  session: SessionData;
}

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private usersService: UsersService) {}

  async intercept(context: ExecutionContext, handler: CallHandler) {
    const request = context.switchToHttp().getRequest<RequestWithSession>();
    const { userId } = request.session || {};

    if (userId) {
      const user = await this.usersService.findOne(userId);
      request['currentUser'] = user;
    }

    return handler.handle();
  }
}
