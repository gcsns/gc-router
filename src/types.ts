import { RoutingControllersOptions } from 'routing-controllers';
import { Express as IExpress } from '@adhityan/gc-logger';
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
