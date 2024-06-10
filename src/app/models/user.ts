import { Role } from "./roles";

export class User {
    username?: string;
    password?: string;
    regUemail?:string;
    regUname?: string;
    token?: string;
    allegicTo?:string;
    alterMob?:string;
    bloodGroup?:string;
    currentAdd?:string;
    dob?:string;
    email?:string;
    emergencyContact?:string;
    ffname?:string;
    first_name?:string;
    flname?:string;
    fmname?:string;
    hobbies?:string;
    id?:string;
    imgSource?:string;
    last_name?:string;
    majorIllness?:string;
    middle_name?:string;
    mob?:string;
    permanantAdd?:string;
    registerid?:string;
    role?:Role;
    // majorIllness?:string;

}
export class Bank{
        BRANCH?: string;
        CENTRE?: string;
        DISTRICT?: string;
        STATE?: string;
        ADDRESS?: string;
        CONTACT?: string;
        IMPS?: string;
        CITY?: string;
        UPI?: string;
        MICR?: string;
        RTGS?: string;
        NEFT?: string;
        SWIFT?: string;
        ISO3166?: string;
        BANK?: string;
        BANKCODE?: string;
        IFSC?: string;
}
export class employeeStatus{
    id:any;
    name?:string;
    registration?:boolean;
    application?:boolean;
    personalDetails?:boolean;
    educationalDetails?:boolean;
    employmentDetails?:boolean;
    Documents?:boolean;
    myDocuments?:boolean;
    employementDocuments?:boolean;
    token?: string;
    role?:Role;
}
export class faq{
    id?:Int16Array;
    tittle?:string;
    ans?:string;
    postedByRegId?:Int16Array;
}
// export class token{
//     token?:string;
// }