import { RoutingControllersOptions, HttpError } from 'routing-controllers';
import { OpenAPIObject } from 'openapi3-ts';
export declare type RoutingOptions = RoutingControllersOptions & ({
    enableDocumentation: true;
    documentationParameters?: Partial<OpenAPIObject> | {
        baseUrl: string;
        title?: string;
        description?: string;
    };
} | {
    enableDocumentation?: false;
});
export declare class ResponseBase {
    requestId: string;
    constructor();
}
export declare class RequestBase {
    requestId: string;
    constructor();
}
export declare class ExpressError extends HttpError {
    constructor(statusCode?: number, message?: string);
}
