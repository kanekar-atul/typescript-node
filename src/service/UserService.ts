import { KeyValueString } from "../common/model";
import { UserRepository } from "../repository/UserRepository";
import { Logger } from "@aws-lambda-powertools/logger";

export class UserService {
    private readonly _userRepository : UserRepository | undefined;
    private readonly _serviceConfig : KeyValueString | undefined; 
    private readonly _logger: Logger;
    
    constructor(userServiceParams:any){ 
        this._userRepository = userServiceParams.userRepository;
        this._serviceConfig = userServiceParams!.serviceConfig;
        this._logger = userServiceParams!.logger;
    }

    public  async getUserProfile(profileId:string){ 
        const data = await this._userRepository!.getUserProfileData(profileId);
        console.log(data)
        return {
            enviroment : this._serviceConfig!.enviroment,
            result : data
        };
    }
}