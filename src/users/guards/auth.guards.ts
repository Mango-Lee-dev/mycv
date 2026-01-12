import { CanActivate, ExecutionContext } from '@nestjs/common';
interface SessionData {
  color?: string;
  userId?: number;
}

interface RequestWithSession extends Request {
  session: SessionData;
}

export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): any {
    const request = context.switchToHttp().getRequest<RequestWithSession>();
    return request.session.userId;
  }
}
