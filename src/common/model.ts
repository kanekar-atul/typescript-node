export interface User {
    id: number;
    firstName: string;
    lastName: string;
    country: string;
    pinCode?:number;
}

export interface KeyValueString {
    [key:string] : string;
}