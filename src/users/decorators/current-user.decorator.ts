import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../user.entity';

interface SessionData {
  color?: string;
  userId?: number;
}

interface RequestWithSession extends Request {
  session: SessionData;
  currentUser?: User | null;
}

export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<RequestWithSession>();
    return request.currentUser;
  },
);
