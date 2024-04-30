import { KeyValueString } from "../common/model";
import { UserRepository } from "../repository/UserRepository";

export class UserService {
    private readonly _userRepository : UserRepository | undefined;
    private readonly _serviceConfig : KeyValueString | undefined; 

    constructor(userServiceParams:any){ 
        this._userRepository = userServiceParams.userRepository;
        this._serviceConfig = userServiceParams!.serviceConfig;
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