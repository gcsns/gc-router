import { RoutingControllersOptions, HttpError } from 'routing-controllers';
import { OpenAPIObject } from 'openapi3-ts';
import util from 'util';

export type RoutingOptions = RoutingControllersOptions &
    (
        | {
              enableDocumentation: true;
              documentationParameters?:
                  | Partial<OpenAPIObject>
                  | {
                        baseUrl: string;
                        title?: string;
                        description?: string;
                    };
          }
        | {
              enableDocumentation?: false;
          }
    );

export class ResponseBase {
    requestId: string;

    constructor() {
        this.requestId = '---';
    }
}

export class RequestBase {}

export class ExpressError extends HttpError {
    constructor(statusCode?: number, message?: string) {
        statusCode = statusCode ?? 500;
        super(statusCode, message);
    }

    toJSON() {
        return this;
    }
}
