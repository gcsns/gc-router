import { Request as IRequest, Response as IResponse } from 'express';
import { Express, Logger } from '@adhityan/gc-logger';
import { ExpressError } from './types';
import {
    Interceptor,
    InterceptorInterface,
    Action,
    Middleware,
    ExpressErrorMiddlewareInterface
} from 'routing-controllers';

@Middleware({ type: 'after' })
export class ErrorFormatHandler implements ExpressErrorMiddlewareInterface {
    error(error: any, request: Express.Request, response: Express.Response, next: () => any) {
        if ((<any>error).errorIdentifier) delete (<any>error).errorIdentifier;
        const status = (<ExpressError>error).httpCode || request.statusCode || 500;
        Logger.error('[Express Error]', error);

        const message = {
            requestId: request.requestId,
            message: error.message || 'Something is not right...',
            errors: error.errors
        };

        response.status(status).send(message);
        next();
    }
}

@Interceptor()
export class FormatInterceptor implements InterceptorInterface {
    intercept(action: Action, body: any) {
        if(!body) return;
        
        if (body.constructor === Array) body = { data: body, requestId: (<Express.Request>action.request).requestId };
        else if (typeof body === 'object' && body !== null)
            body.requestId = (<Express.Request>action.request).requestId;
        else if (typeof body === 'string')
            body = {
                message: body,
                requestId: (<Express.Request>action.request).requestId
            };

        return body;
    }
}
