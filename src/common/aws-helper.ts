import { DynamoDBClient, DynamoDBClientConfig } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

class AWSHelper {
    private _ddbDocClient: DynamoDBDocumentClient;

    constructor() {
        this._initDynamoDBDocClient();
    }

    public get ddbDocClient(): DynamoDBDocumentClient {
        return <DynamoDBDocumentClient>this._ddbDocClient;
    }

    private _initDynamoDBDocClient() {
        console.log("initializing DDB doc client");
        const marshallOptions = {
            // Whether to automatically convert empty strings, blobs, and sets to `null`.
            convertEmptyValues: false, // false, by default.
            // Whether to remove undefined values while marshalling.
            removeUndefinedValues: true, // false, by default.
            // Whether to convert typeof object to map attribute.
            convertClassInstanceToMap: false, // false, by default.
        };

        const unmarshallOptions = {
            // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
            wrapNumbers: false, // false, by default.
        };

        const translateConfig = {
            marshallOptions,
            unmarshallOptions,
        };
        const ddbClientConfig: DynamoDBClientConfig = {};
        const dynamoDBClient = new DynamoDBClient(ddbClientConfig);
        //this._ddbDocClient = DynamoDBDocumentClient.from(dynamoDBClient);
        this._ddbDocClient = DynamoDBDocumentClient.from(dynamoDBClient, translateConfig);
    }
}
export const awsHelper = new AWSHelper();
