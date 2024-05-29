
import { KeyStringValueAny } from "./model";

export const HTTP_RESPONSE = {
    statusCode: 200,
    isBase64Encoded: false,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers":
            "Content-Type,X-Amz-Date,X-Amz-Security-Token,Authorization,X-Api-Key,X-Requested-With,Accept,Access-Control-Allow-Methods,Access-Control-Allow-Origin,Access-Control-Allow-Headers",
        "Access-Control-Allow-Origin": "*", // Allow from anywhere
        "Access-Control-Allow-Methods": "DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT",
    },
};

export class CommonConstant {
    public static readonly SUCCESS:string = 'success';
    public static readonly FAILURE:string = 'failure';
} 

export enum RESPONSE_CODE {
    NO_PROFILE_ID_RCVD = "NO_PROFILE_ID_RCVD"
}


export enum ScoreStatuses {
    REPORTABLE = "REPORTABLE",
    NOT_REPORTABLE = "NOT_REPORTABLE",
}

export enum Measures {
    READING = "reading",
    LISTENING = "listening",
    WRITING = "writing",
    SPEAKING = "speaking",
}

export enum QRMeasures {
    QR_READING = "Reading",
    QR_LISTENING = "Listening",
    QR_WRITING = "Writing",
    QR_SPEAKING = "Speaking",
}

export enum ResultSource {
    EREG = "ereg",
    TPO = "tpo",
    TESTREADY = "testready",
}

export class CommonConstants {
    public static readonly SUCCESS: string = "success";
    public static readonly FAILURE: string = "failure";
    public static readonly MEASURE_IDS: string[] = [Measures.READING, Measures.LISTENING, Measures.WRITING, Measures.SPEAKING];
    public static readonly MAXSCORE: number = 120;
    public static readonly EREG_TPO_MAX_POINTS: number = 30;
    public static readonly MAX_SCR_WRTNG_ITEM: number = 5;
    public static readonly MAX_SCR_SPKNG_ITEM: number = 4;
    public static readonly IBT_TEST_FLFMNT_TYPES: string[] = ["TEST", "RESCHEDULE"];
    public static readonly IBT_TEST_CODES: string[] = ["XML", "TWS"];
    public static readonly SCR_NAME_TOTAL: string = "TOTAL";
    public static readonly SCR_ID_TOTAL: string = "109";
    public static readonly OVERALL: string = "Overall";
    public static readonly QR_MEASURE_IDS: string[] = [QRMeasures.QR_READING, QRMeasures.QR_LISTENING, QRMeasures.QR_WRITING, QRMeasures.QR_SPEAKING];
    public static readonly QR_SPKG_WRTNG_MEASURE_IDS: string[] = [QRMeasures.QR_SPEAKING, QRMeasures.QR_WRITING];
    public static readonly SIS_RS_EREG: string = "EREG";
    public static readonly SIS_RS_TPO: string = "TPO";
    public static readonly SIS_RS_TESTREADY: string = "TEST_READY";
    public static readonly SIS_PERF_TR_KEY: string = "testReady";
    public static readonly SIS_PERF_TPO_KEY: string = "tpo";
    public static readonly SIS_PERF_EREG_KEY: string = "ereg";
    public static readonly SIS_PERF_KEYS: string[] = [this.SIS_PERF_TR_KEY, this.SIS_PERF_TPO_KEY, this.SIS_PERF_EREG_KEY];
    public static readonly SENSITIVE_HTTP_HEADERS: string[] = ["authorization", "x-amz-security-token"];
    public static readonly MAX_ORDERS_TO_PERSIST: number = 25;
    public static readonly MAX_RESULT_DATA_TO_PERSIST: number = 10;
    public static readonly INTG_SPEAKING_ITEM_LEVEL_TYPES: string[] = ["integratedSpeaking", "Integrated Speaking"];
    public static readonly INTG_WRITING_ITEM_LEVEL_TYPES: string[] = ["integratedWriting", "Integrated Writing RLW"];
    public static readonly INDPDNT_SPKING_ITEM_LEVEL_TYPES: string[] = ["independentSpeaking", "Independent Speaking"];
    public static readonly ACDMC_DSCN_ITEM_LEVEL_TYPES: string[] = ["academicDiscussion", "Academic Discussion"];
    public static readonly INSIGHTS_SK: string = "INS";
    public static readonly NUM_OF_CHAR_MASK: number = 4;
    public static readonly AUTH_CODE_UNFULFILLED: string = "UNFULFILLED";
    public static readonly MSK_END: boolean = true;
    public static readonly SIS_CALL_MAX_ATTEMPTS: number = 3;
    public static readonly RECO_CALL_MAX_ATTEMPTS: number = 3;
    public static readonly HTTP_RETRY_STATUS_CODES: number[] = [408, 425, 429, 500, 502, 503, 504];
}

export enum ResultStatuses {
    NOT_STARTED = "NOT_STARTED",
    STARTED = "STARTED",
    COMPLETED = "COMPLETED",
    SCORED = "SCORED",
    CANCELLED = "CANCELLED",
    NOT_AVAILABLE = "NOT_AVAILABLE",
}

//need to create mapping for keys of the SIS performance object and insights product types(ereg,tpo,testready)
//SIS is sending values that are different from what was initially set up
export const SISPerfKeys: { [key: string]: ResultSource } = {
    [CommonConstants.SIS_PERF_EREG_KEY]: ResultSource.EREG,
    [CommonConstants.SIS_PERF_TR_KEY]: ResultSource.TESTREADY,
    [CommonConstants.SIS_PERF_TPO_KEY]: ResultSource.TPO,
};

//need to create mapping for values of the resultsource in orders from SIS
//SIS is sending values that are different from what was initially set up(ereg,tpo,testready)
export const SISResultSource: { [key: string]: ResultSource } = {
    [CommonConstants.SIS_RS_EREG]: ResultSource.EREG,
    [CommonConstants.SIS_RS_TESTREADY]: ResultSource.TESTREADY,
    [CommonConstants.SIS_RS_TPO]: ResultSource.TPO,
};

export const QRMeasuresMapping: { [key: string]: Measures } = {
    [QRMeasures.QR_READING]: Measures.READING,
    [QRMeasures.QR_LISTENING]: Measures.LISTENING,
    [QRMeasures.QR_WRITING]: Measures.WRITING,
    [QRMeasures.QR_SPEAKING]: Measures.SPEAKING,
};

 
export enum HTTP_RES_ERR_CODE {
    BAD_REQUEST = 400,
    INTERNAL_SERVER_ERROR = 500,
}

export enum ERROR_CODES {
    NO_STDNT_PRFL_ID_RCVD = "NO_STDNT_PRFL_ID_RCVD",
    INVALID_INSGHTS_TYP_RCVD = "INVALID_INSGHTS_TYP_RCVD",
    GENERIC_ERROR = "GENERIC_ERROR",
    DDB_PUT_FLD = "DDB_PUT_FLD",
    HTTP_CALL_ERR = "HTTP_CALL_ERR",
    HTTP_CALL_FLD = "HTTP_CALL_FLD",
    SIS_SRVC_FLRE = "SIS_SRVC_FLRE",
    INVLD_LMBDA_MTH = "INVLD_LMBDA_MTH",
    NO_EVNT_BODY_RCVD = "NO_EVNT_BODY_RCVD",
}

export const SCORE_NAME_TYPE: KeyStringValueAny = {
    READSCL: {
        measure: "reading",
        scoreId: "102",
    },
    LISTSCL: {
        measure: "listening",
        scoreId: "103",
    },
    SPKSCL: {
        measure: "speaking",
        scoreId: "104",
    },
    WRITSCL: {
        measure: "writing",
        scoreId: "105",
    },
};

export enum HTTPMethod {
    CONNECT = "CONNECT",
    DELETE = "DELETE",
    GET = "GET",
    HEAD = "HEAD",
    OPTIONS = "OPTIONS",
    PATCH = "PATCH",
    POST = "POST",
    PUT = "PUT",
    TRACE = "TRACE",
}

export enum APICalls {
    SIS = "sis",
    RECOMMENDATIONS = "reco",
    PRF_TEST = "prf_test",
}
