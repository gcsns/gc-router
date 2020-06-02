import { NextFunction, ErrorRequestHandler, Request as IRequest, Response as IResponse } from 'express';
import { Express } from '@adhityan/gc-logger';
import { ExpressError } from './types';

export const errorMiddleware = (): ErrorRequestHandler => {
    return (error: ExpressError, req: IRequest, res: IResponse, next: NextFunction) => {
        const status = error.statusCode || res.statusCode || 500;

        const message = {
            requestId: (<Express.Request>req).requestId,
            message: error.message || 'Something went wrong'
        };

        res.status(status).send({
            status,
            message
        });
    };
};

export const parseMiddleware = () => {
    return (body: any, req: Express.Request, res: Express.Response) => {
        if (typeof body === 'object' && body !== null) body.requestId = req.requestId;
        else if (typeof body === 'string')
            body = {
                message: body,
                requestId: req.requestId
            };

        return body;
    };
};
