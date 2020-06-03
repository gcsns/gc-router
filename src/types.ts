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

export type ResponseBase = {
    requestId: string;
};

export interface ExpressError extends Error {
    statusCode: number;
}
