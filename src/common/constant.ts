
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