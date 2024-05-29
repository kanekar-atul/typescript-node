import { Logger } from "@aws-lambda-powertools/logger";
import { BaseError, HTTPClientError } from "./error";
import { APICalls, CommonConstants, ERROR_CODES, HTTPMethod } from "./constant";
import { isStringEmpty, logPerfDuration, removeSensitiveHeaders } from "./util";
import { logger } from "../common/powertool";
import { KeyStringValueAny, KeyValueString } from "./model";
import { performance as http_perf, PerformanceMeasure } from "node:perf_hooks";

export interface RequestParams<T = string> {
    path: string;
    config?: RequestInit;
    body?: any;
    callType: APICalls;
    loggingData?: KeyStringValueAny;
}

export interface ClientParams {
    baseUrl?: string;
    clientConfig?: RequestInit;
    logger: Logger;
}

export class HttpClient {
    private readonly _baseUrl: string | undefined;
    private readonly _logger: Logger;
    private readonly _clientConfig: RequestInit | undefined;

    constructor(clientParams: ClientParams) {
        this._baseUrl = clientParams.baseUrl;
        this._logger = clientParams.logger;
        this._clientConfig = clientParams.clientConfig;
    }

    async get<T>({ path, config, ...rest }: RequestParams): Promise<T> {
        this._logger.info("invoking get request", {
            ...rest.loggingData,
        });
        return await this.http<T>({
            path,
            config: {
                method: HTTPMethod.GET,
                ...config,
            },
            ...rest,
        });
    }

    async post<T, U>({ body, config, ...rest }: RequestParams<T>): Promise<U> {
        this._logger.info("invoking post request", {
            ...rest.loggingData,
        });
        return await this.http<U>({
            config: {
                method: HTTPMethod.POST,
                body: body,
                ...config,
            },
            ...rest,
        });
    }

    async put<T, U>({ body, config, ...rest }: RequestParams<T>): Promise<U> {
        this._logger.info("invoking put request", {
            ...rest.loggingData,
        });
        return await this.http<U>({
            config: {
                method: HTTPMethod.PUT,
                body: JSON.stringify(body),
                ...config,
            },
            ...rest,
        });
    }

    async delete<T>({ config, ...rest }: RequestParams): Promise<T> {
        this._logger.info("invoking delete request", {
            ...rest.loggingData,
        });
        return await this.http<T>({
            config: {
                method: HTTPMethod.DELETE,
                ...config,
            },
            ...rest,
        });
    }

    private async http<T>(requestParams: RequestParams): Promise<T> {
        let response: Response;
        let result: any;
        const requestConfig: RequestInit = {
            ...this._clientConfig,
            ...requestParams.config,
        };
        const apiURL: string =
            !isStringEmpty(requestParams.path) && requestParams.path.startsWith("http")
                ? requestParams.path
                : `${this._baseUrl}${requestParams.path}`;
        this._logger.info({
            message: "",
            url: apiURL,
            ...requestParams.loggingData,
        });
        const request: Request = new Request(apiURL, {
            ...requestConfig,
        });
        try {
            http_perf.mark(`${requestParams.callType}:st`);
            response = await fetch(request).catch((e) => e);
            http_perf.mark(`${requestParams.callType}:end`);
            const httpCallPerfMsr: PerformanceMeasure = http_perf.measure(
                `${requestParams.callType}_api`,
                `${requestParams.callType}:st`,
                `${requestParams.callType}:end`,
            );
            logPerfDuration(httpCallPerfMsr, this._logger, requestParams.loggingData);
            if (!response.ok) {
                let errResp;
                let respHeaders: KeyValueString = {};
                let rqstHeaders: KeyValueString = {};
                try {
                    errResp = await response.clone().json();
                } catch (err) {
                    try {
                        errResp = await response.text();
                    } catch (err) {}
                }
                if (response?.headers) {
                    respHeaders = removeSensitiveHeaders(response.headers);
                }
                if (requestConfig?.headers) {
                    rqstHeaders = removeSensitiveHeaders(requestConfig?.headers as Headers);
                }
                throw new HTTPClientError(
                    `${isStringEmpty(requestParams.callType) ? "http" : requestParams.callType} call failed`,
                    {
                        attempt: requestParams.loggingData?.attempt,
                        request: {
                            url: request.url,
                            config: {
                                ...requestConfig,
                                headers: rqstHeaders,
                            },
                        },
                        response: {
                            status: response.status,
                            statusText: response.statusText,
                            data: errResp,
                            headers: respHeaders,
                        },
                    },
                    `${requestParams.callType.toUpperCase()}_${ERROR_CODES.HTTP_CALL_FLD}`,
                );
            }
            const contentType = response.headers.get("content-type");
            result = (await contentType?.indexOf("application/json")) !== -1 ? response.json() : response.text();
        } catch (error) {
            if (error instanceof BaseError) {
                throw error;
            }
            let rqstHeaders: KeyValueString = {};
            if (requestConfig?.headers) {
                rqstHeaders = removeSensitiveHeaders(requestConfig?.headers as Headers);
            }
            throw new HTTPClientError(
                `error during ${isStringEmpty(requestParams.callType) ? "" : requestParams.callType} http call`,
                {
                    logData: {
                        attempt: requestParams.loggingData?.attempt,
                        request: {
                            url: request.url,
                            config: {
                                ...requestConfig,
                                headers: rqstHeaders,
                            },
                        },
                        srcErr: error,
                    },
                },
                `${requestParams.callType.toUpperCase()}_${ERROR_CODES.HTTP_CALL_ERR}`,
            );
        }
        return result;
    }
}

export const httpClient = new HttpClient({
    clientConfig: { keepalive: true },
    logger: logger.createChild({
        serviceName: "HTTPClient",
    }),
});

// //no default URL start
// const noDefURLHttpClient = new HttpClient({
//     logger: logger.createChild({serviceName: 'HTTPClient'}),
//     clientConfig: {
//         headers: {
//             "Content-Type": "application/json",
//         }
//     }
// });
// noDefURLHttpClient.get({
//     callType: APICalls.SIS,
//     path: "https://httpbin.org/get?test=get"
// } as RequestParams).then((data: any) => console.log("result: "+JSON.stringify(data))).catch(err => console.log("err: "+err));
// noDefURLHttpClient.post({path: "https://httpbin.org/post", body : {"test":"post"}}).then((data: any) => console.log("result: "+JSON.stringify(data))).catch(err => console.log("err: "+err));
// //no default URL end

// //with default URL start
// const httpClient = new HttpClient({
//     baseUrl: "https://httpbin.org",
//     logger: logger.createChild({serviceName: 'HTTPClient'}),
//     clientConfig: {
//         headers: {
//             "Content-Type": "application/json",
//         }
//     }
// });
// httpClient.get({path: "/get?test=get"}).then((data: any) => {
//     logger.info("result: "+JSON.stringify(data))
// }).catch(err => {
//     logger.error("http get request failed", {
//         err, errorCode: err?.errorCode, errorId: err?.errorId,
//         logData: {...err?.logData}
//     });
// });
// httpClient.post({path: "/post", body : {"test":"post"}}).then((data: any) => console.log("result: "+JSON.stringify(data))).catch(err => console.log("err: "+err));
// //with default URL end
