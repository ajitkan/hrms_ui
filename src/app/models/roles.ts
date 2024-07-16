export enum Role {
    User = 'User',
    Admin = 'Admin',
    SuperAdmin = 'Super Admin',
    Recruiter = 'Recruiter'
}


export class Roles{
    id:number=0;
    name:string="";
    description:string="";
    active:boolean=true;
    createdAt:Date=new Date();
}