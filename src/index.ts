import { CommonConstant, HTTP_RESPONSE, RESPONSE_CODE } from "./common/constant";
import { KeyValueString } from "./common/model";
import { isNullOrUndefined } from "./common/util";
import { UserRepository } from "./repository/UserRepository";
import { UserService } from "./service/UserService";

const handler = async (profileId:string):Promise<any>=>{
  try {
    console.log('isNullOrUndefined : ', isNullOrUndefined(profileId))
      if(isNullOrUndefined(profileId)){
        return {
          ...HTTP_RESPONSE,
          statusCode : 404,
          body:JSON.stringify(
            {
              status:CommonConstant.FAILURE,
              responseCode:RESPONSE_CODE.NO_PROFILE_ID_RCVD,
              msg: `Profile Id : ${profileId}`
            })
        }
      }

      const UserServiceParams = {
        userRepository : new UserRepository({
          persistenceConfig: userRepositoryParams()
        }),
        serviceConfig : serviceConfig(), 
      }
      const res = await new UserService(UserServiceParams).getUserProfile(profileId);
      return { 
        ...HTTP_RESPONSE,
        body:JSON.stringify({
          status:CommonConstant.SUCCESS,
          result:res
        })
      }
  } catch (error) {
    console.log(error);
    return {
      ...HTTP_RESPONSE,
      stastCode:500,
      body:JSON.stringify({
        status:CommonConstant.FAILURE
      })
    }
  } 
} 

const serviceConfig =  () : KeyValueString=>{
  /* if (isStringEmpty(process.env?.ENVIRONMENT)) {
    throw new Error("runtime environment name not set");
  } */

  return {
    'enviroment' : 'dev' //process.env.enviroment,    
  }
}

const userRepositoryParams = () : KeyValueString=>{
  return {
    table_name : "TEST"
  }
}

let profileId = '1';
 handler(profileId).then((data)=>{
  console.log(data)
 });