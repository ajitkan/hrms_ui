export class CompleteDetails {
    registration?: RegistrationDetail;
    signUpDetails?: SignUpDetail;
    educationDetails?: EducationDetail[];
    experienceDetails?: ExperienceDetail[];
    personalDetails?: PersonalDetail;
    documentDetails?: DocumentDetail[];
  }
  
  export class RegistrationDetail {
    title!: string;
    firstName!: string;
    middleName!: string;
    lastName!: string;
    personalEmail!: string;
    email!: string;
    mob!: string;
    gender!: string;
    currentCountry!: string;
    currentState!: string;
    currentLocation!: string;
    maritalStatus!: string;
    skills!: string;
  }
  
  export class SignUpDetail {
    id!: number;
    roles!: string;
    email!: string;
    designation!: string;
  }
  
  export class EducationDetail {
    college!: string;
    courseTitle!: string;
    courseType!: string;
    duration!: string;
    otherCourseSpecialization!: string;
    otherCourseTitle!: string;
    perOrcgpa!: string;
    specialization!: string;
  }
  
  export class ExperienceDetail {
    companyName!: string;
    designation!: string;
    rmName!: string;
    rmMob!: string;
    rmMail!: string;
    hrName!: string;
    hrMob!: string;
    hrMail!: string;
    duration!: string;
  }
  
  export class PersonalDetail {
    imgSource!: string;
    title!: string;
    firstName!: string;
    middleName!: string;
    lastName!: string;
    email!: string;
    dob!: Date;
    ftitle!: string;
    ffname!: string;
    fmname!: string;
    flname!: string;
    currentAdd!: string;
    permanantAdd!: string;
    mob!: string;
    perMob!: string;
    altermob!: string;
    emergencyContactName!: string;
    emergencyContactNo!: string;
    emergencyContactRelation!: string;
    emergencyContactRelationOther!: string;
    altEmergencyContactName!: string;
    altEmergencyContactNo!: string;
    altEmergencyContactRelation!: string;
    altEmergencyContactRelationOther!: string;
    aadhar!: string;
    pan!: string;
    uan!: string;
    accountNo!: string;
    accountHolderName!: string;
    branchCENTRE!: string;
    ifsc!: string;
    branchName!: string;
    branchDISTRICT!: string;
    branchADDRESS!: string;
    branchCONTACT!: string;
    bloodGroup!: string;
    hobbies!: string;
    majorIllness!: string;
    allegicTo!: string;
    branchSTATE!: string;
    aboutMe!: string;
  }
  
  export class DocumentDetail {
    fileName!: string;
    companyName!: string;
    docSource!: string;
    docType!: string;
    docDescription!: string;
  }
  