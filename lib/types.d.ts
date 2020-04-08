import { RoutingControllersOptions } from "routing-controllers";
import { OpenAPIObject } from 'openapi3-ts';
export declare type RoutingOptions = RoutingControllersOptions & ({
    enableDocumentation: true;
    documentationPath?: string;
    documentationParameters?: Partial<OpenAPIObject> | {
        title: string;
        baseUrl: string;
        description: string;
    };
} | {
    enableDocumentation?: false;
});
