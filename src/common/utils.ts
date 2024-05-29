import { nanoid } from "nanoid";
import { DateTime } from "luxon";
import { HttpRequest } from "@smithy/protocol-http";
import { HttpRequest as SignedRequest } from "@aws-sdk/types";
import { defaultProvider } from "@aws-sdk/credential-provider-node";
import { SignatureV4 } from "@smithy/signature-v4";
import { Sha256 } from "@aws-crypto/sha256-browser";
import { Logger } from "@aws-lambda-powertools/logger";
import { PerformanceMeasure } from "node:perf_hooks";
import { KeyStringValueAny, KeyValueString, SISOrderItem } from "./model";
import { CommonConstants } from "./constant";

export const isObjectEmpty = (obj: Object | null | undefined): boolean => !obj || Object.keys(obj).length === 0;

export const isArrayNullOrEmpty = (arr: any[] | null | undefined): boolean => !Array.isArray(arr) || arr.length === 0;

export const isStringEmpty = (str: string | undefined | null): boolean => !str || 0 === str.length;

export const getUniqueId = (size?: number): string => nanoid(size);

// const pad = (num: number): string => (num < 10 ? '0' : '') + num;
//
// const toIsoString = (date: Date): string => {
//     const tzo = date.getTimezoneOffset(),
//         dif = tzo >= 0 ? '+' : '-';
//     return date.getFullYear() +
//         '-' + pad(date.getMonth() + 1) +
//         '-' + pad(date.getDate()) +
//         'T' + pad(date.getHours()) +
//         ':' + pad(date.getMinutes()) +
//         ':' + pad(date.getSeconds()) +
//         dif + pad(Math.floor(Math.abs(tzo) / 60)) +
//         ':' + pad(Math.abs(tzo) % 60);
// };

//export const currentTimeStamp = (): string => toIsoString(new Date());
export const currentTimeStamp = (): string | null => DateTime.now().toISO();

export const getRoundPercentage = (productPercentage: number): number => Math.round(productPercentage * 100);

export const getSignedRequest = async (request: HttpRequest, awsService: string): Promise<SignedRequest> => {
    const signer: SignatureV4 = new SignatureV4({
        credentials: defaultProvider(),
        region: process.env.AWS_REGION!,
        service: awsService,
        sha256: Sha256,
    });
    return await signer.sign(request, {
        signingDate: new Date(),
    });
};

export const msToReadable = (ms: number): string => {
    if (isNaN(ms)) {
        return "";
    }
    const milliSeconds: number = ms % 1000;
    const seconds: number = Math.floor((ms / 1000) % 60);
    const minutes: number = Math.floor((ms / 1000 / 60) % 60);
    //    const hours = Math.floor(ms / 1000 / 60 / 60);
    const readable = [
        //        `${pad(hours.toString(), 2)}hh`,
        `${pad(minutes.toString(), 2)}mm`,
        `${pad(seconds.toString(), 2)}ss`,
        `${milliSeconds}ms`,
    ].join(":");
    return readable;
};

export const pad = (numberString: string, size: number): string => {
    let padded: string = numberString;
    while (padded.length < size) padded = `0${padded}`;
    return padded;
};

export const delay = (delayTime: number = 1) => {
    return new Promise((resolve) => setTimeout(resolve, delayTime));
};

export const logPerfDuration = (pm: PerformanceMeasure, logger: Logger, loggingData?: KeyStringValueAny) => {
    logger.info("perf-drtn", {
        name: pm.name,
        duration: msToReadable(pm.duration),
        ...loggingData,
    });
};

export const toDateTime = (dt: string): DateTime => DateTime.fromISO(dt, { setZone: true });

export const sortByLocalAppointmentDateTime = (order1: SISOrderItem, order2: SISOrderItem) => {
    const time1 = toDateTime(order1.appointment?.localAppointmentDateTime!);
    const time2 = toDateTime(order2.appointment?.localAppointmentDateTime!);
    return time1 < time2 ? -1 : time1 > time2 ? 1 : 0;
};

export const beyondCurrentTime = (time: string): boolean => toDateTime(time).toUTC() > DateTime.now().toUTC();

export const chunkArray = (srcArr: any, size: number) => {
    if (!srcArr) return null;
    return srcArr.map((_: any, i: number) => (i % size === 0 ? srcArr.slice(i, i + size) : null)).filter(Boolean);
};

export const removeSensitiveHeaders = (headersToProcess: Headers): KeyValueString => {
    let headers: KeyValueString = {};
    headersToProcess.forEach((value: string, key: string) => {
        if (!CommonConstants.SENSITIVE_HTTP_HEADERS.includes(key.toLowerCase())) {
            headers[key] = value;
        }
    });
    return headers;
};

export const maskString = (stringToMask: string, end: boolean, numOfChar: number = 0, maskChar: string = "#") => {
    if (numOfChar > 0) {
        if (end) {
            return stringToMask.slice(-numOfChar).padStart(stringToMask.length, maskChar);
        } else {
            return stringToMask.slice(0, numOfChar).padEnd(stringToMask.length, maskChar);
        }
    } else {
        return stringToMask.replace(/./g, maskChar);
    }
};

export const isNumber = (n: number | null | undefined) => {
    if (typeof n !== "number") {
        return false;
    }
    return isFinite(n);
};

export const isAnyZero = (n1: number | null | undefined, n2: number | null | undefined) => {
    if (n1 === 0 && n2 === 0) {
        return true;
    } else if (n1 === 0) {
        return true;
    }
    return n2 === 0;
};

export const exponentialDelay = (delayTime: number = 3, delayFactor: number = 10) => {
    return delay(delayFactor ** delayTime);
};
