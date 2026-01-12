import { createParamDecorator, ExecutionContext } from '@nestjs/common';

interface SessionData {
  color?: string;
  userId?: number;
}

interface RequestWithSession extends Request {
  session: SessionData;
}

export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<RequestWithSession>();
    console.log(request.session.userId);
    return 'hi there';
  },
);
