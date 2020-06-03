import { RoutingControllersOptions, HttpError } from 'routing-controllers';
import { OpenAPIObject } from 'openapi3-ts';

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

export class RequestBase {
    requestId: string;

    constructor() {
        this.requestId = 'NI';
    }
}

export class ExpressError extends HttpError {
    constructor(statusCode?: number, message?: string) {
        statusCode = statusCode ?? 500;
        super(statusCode, message);
    }
}
