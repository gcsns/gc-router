import { Request as IRequest, Response as IResponse } from 'express';
import { Express, Logger } from '@adhityan/gc-logger';
import { ExpressError } from './types';

export const handleError = (error: Error, req: IRequest, res: IResponse) => {
    if ((<any>error).errorIdentifier) delete (<any>error).errorIdentifier;
    const status = (<ExpressError>error).httpCode || res.statusCode || 500;
    Logger.error('Express error', error);

    const message = {
        message: error.message || 'Something went wrong'
    };

    res.status(status);
    return message;
};

export const parseMiddleware = (body: any, req: IRequest, res: IResponse) => {
    if (body.constructor === Array) body = { data: body, requestId: (<Express.Request>req).requestId };
    else if (typeof body === 'object' && body !== null) {
        if (body.errorIdentifier === '!parseGeneratedError!') body = handleError(body, req, res);
        body.requestId = (<Express.Request>req).requestId;
    } else if (typeof body === 'string')
        body = {
            message: body,
            requestId: (<Express.Request>req).requestId
        };

    return body;
};
