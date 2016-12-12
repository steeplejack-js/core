import { IException } from "../interfaces/exception";
export declare abstract class Exception extends Error implements IException {
    message: string;
    type: string;
    constructor(message?: any, ...args: any[]);
    getDetail(): any;
    getHttpCode(): number;
}
