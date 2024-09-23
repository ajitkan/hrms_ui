
export interface LeaveRequestDto {
[x: string]: any;
    requestID: number;
    employeeCode: string;
    firstName:string;
    lastName:string;
    leaveCategory: string;
    leaveSubCategory: string;
    leaveStartDate: Date;
    leaveEndDate: Date;
    leaveReason: string;
    leaveApprovalLevel: string; // Adjust this based on your API response
    leaveApprover: string;
    leaveStatus: string;
    leaveType: string;
    isApplicable: boolean;
    createdBy: string;
    createdDate: Date;
    updatedBy?: string; // Optional field
    updatedDate?: Date; // Optional field
    selected: Boolean;
  }

  export interface RegularizationRequestDto {
    [x: string]:any;
    regDate: string;
    employeeCode: string;
    actualPunchInTime: Date;
    actualPunchOutTime: Date;
    newPunchInTime: Date;
    newPunchOutTime: Date;
    remark: string;
    selected: Boolean;
  }