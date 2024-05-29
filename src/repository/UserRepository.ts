import { PutCommandInput, PutCommand, NativeAttributeValue } from '@aws-sdk/lib-dynamodb';
import { awsHelper } from '../common/aws-helper';
import { CommonConstants, ERROR_CODES } from '../common/constant';
import userdata from '../common/data.json'
import { DynamoDBAccessError } from '../common/error';
import { Insights, KeyValueString } from '../common/model';
import { Logger } from "@aws-lambda-powertools/logger";
import { currentTimeStamp } from '../common/util';
export class UserRepository { 
    private persistenceConfig: KeyValueString;
    private _logger: Logger;

    constructor(params: any) { 
        this._logger = params.logger;
        this.persistenceConfig = params.persistenceConfig;
    } 
    
    public getUserProfileData(profileId:string):any{
        console.log("In UserRepository : getUserProfileData() ")
        //throw new Error("Connection Error");
         const data =  userdata.filter((user)=>{
              return user.id.toString() == profileId;
         });
        return  {
            "tablename":this.persistenceConfig.table_name,
            data
         }
    }

    public async saveUser() {
        const putParams: PutCommandInput = {
            TableName: this.persistenceConfig.insTableName,
            Item: {},
            //Item: this._insightsToDDBItem(insights),
        };
        this._logger.info("attempting to save ins");
        try {
            await awsHelper.ddbDocClient.send(new PutCommand(putParams));
            this._logger.info("user saved successfully");
        } catch (error: any) {
            throw new DynamoDBAccessError(
                "error saving ins",
                {
                    insId: 123,
                    srcErr: error,
                },
                ERROR_CODES.DDB_PUT_FLD,
            );
        }
    }
    

    /* private _inToDDBItem(ins: Insights): Record<string, NativeAttributeValue> {
        const currTS = currentTimeStamp();
        let ddbItem: Record<string, NativeAttributeValue> = {
            id: ins.testTakerProfileId,
            sk: `${CommonConstants?.ins_SK}#${ins.insId}`,
            awsRequestId: ins.awsRequestId,
            createdDate: currTS,
            updatedDate: currTS,
        };
        if (ins.sisResponse) {
            ddbItem.sisResponse = ins.sisResponse;
        }
        if (ins.recommendationResponse) {
            ddbItem.recommendationResponse = ins.recommendationResponse;
        }
        if (ins.insResponse) {
            ddbItem.insResponse = ins.insResponse;
        }
        if (ins.persistMessage) {
            ddbItem.persistMessage = ins.persistMessage;
        }
        return ddbItem;
    } */
}