import userdata from '../common/data.json'
import { KeyValueString } from '../common/model';
export class UserRepository { 
    private persistenceConfig: KeyValueString;
    constructor(params: any) { 
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
}