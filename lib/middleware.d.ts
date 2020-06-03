import { Request as IRequest, Response as IResponse } from 'express';
export declare const handleError: (error: Error, req: IRequest<import("express-serve-static-core").ParamsDictionary>, res: IResponse<any>) => {
    message: string;
};
export declare const parseMiddleware: (body: any, req: IRequest<import("express-serve-static-core").ParamsDictionary>, res: IResponse<any>) => any;
