import { ErrorRequestHandler } from 'express';
import { Express } from '@adhityan/gc-logger';
export declare const errorMiddleware: () => ErrorRequestHandler<import("express-serve-static-core").ParamsDictionary>;
export declare const parseMiddleware: () => (body: any, req: Express.Request, res: Express.Response) => any;
