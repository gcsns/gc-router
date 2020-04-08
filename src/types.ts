import { RoutingControllersOptions } from "routing-controllers";

export type RoutingOptions = RoutingControllersOptions & { 
    enableDocumentation?: boolean,
    documentationPath?: string,
    versionPrefix?: string
}