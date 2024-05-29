import { getUniqueId } from "./utils";

export interface IBaseError {
    errorCode: string;
    errorMessage?: string;
    logData: any;
}

export class BaseError extends Error {
    public errorCode: string;
    public errorId: string;
    public logData: any;

    constructor(params: IBaseError) {
        super(params.errorMessage);
        Error.captureStackTrace(this, this.constructor);
        this.errorCode = params.errorCode;
        (this.errorId = getUniqueId(7)), (this.logData = params.logData);
        //this.stack = JSON.stringify(Error.captureStackTrace(this,this.constructor))
    }
}

export class DynamoDBAccessError extends BaseError {
    constructor(message: string = "DynamoDB Access Error", logData: any, errorCode = "DDBErr") {
        super({
            errorCode: errorCode,
            errorMessage: message,
            logData: logData,
        });
        Error.captureStackTrace(this, this.constructor);
        //this.stack = JSON.stringify(Error.captureStackTrace(this,this.constructor))
        this.name = this.constructor.name;
    }
}

export class GenericError extends BaseError {
    constructor(message: string = "Generic Error", logData: any, errorCode = "GEN_ERR") {
        super({
            errorCode: errorCode,
            errorMessage: message,
            logData: logData,
        });
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
    }
}

export class HTTPClientError extends BaseError {
    constructor(message: string = "HTTPClient Error", logData: any, errorCode = "HTTP_CLNT_ERR") {
        super({
            errorCode: errorCode,
            errorMessage: message,
            logData: logData,
        });
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
    }
}

export class ExternalServiceError extends BaseError {
    constructor(message: string = "External Service Error", logData: any, errorCode = "EXT_SRVC_ERR") {
        super({
            errorCode: errorCode,
            errorMessage: message,
            logData: logData,
        });
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
    }
}

export class SISDataError extends BaseError {
    constructor(message: string = "Invalid SIS data", logData: any, errorCode = "SIS_DTA_ERR") {
        super({
            errorCode: errorCode,
            errorMessage: message,
            logData: logData,
        });
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
    }
}
