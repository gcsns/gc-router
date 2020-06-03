import { RoutingControllersOptions } from 'routing-controllers';
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
        this.requestId = 'NI';
    }
}

export class ExpressError extends Error {
    statusCode: number;

    constructor(statusCode?: number, message?: string) {
        super(message);
        this.statusCode = statusCode ?? 500;
    }
}
