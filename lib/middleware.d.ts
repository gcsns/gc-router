import { Express } from '@adhityan/gc-logger';
import { InterceptorInterface, Action, ExpressErrorMiddlewareInterface } from 'routing-controllers';
export declare class ErrorFormatHandler implements ExpressErrorMiddlewareInterface {
    error(error: any, request: Express.Request, response: Express.Response, next: () => any): void;
}
export declare class FormatInterceptor implements InterceptorInterface {
    intercept(action: Action, body: any): any;
}
