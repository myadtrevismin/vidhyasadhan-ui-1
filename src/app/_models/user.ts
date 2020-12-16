export interface User {
    id?: string;
    username?: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    name?: string;
    phone: string;
    jwtToken?: string;
    refreshToken?: string;
    gender?: string;
    address?: Address;
    accountDetails?: AccountDetail;
    profilePic?: string;
    role?: any;
}

export interface Address{
    addressId?: number;
    addressType: number;
    id?: number;
    address1: string;
    address2: string;
    city: string;
    pinCode: string;
    stateCd: string;
    countryCd: string;
}

export interface AccountDetail{
   id?: number;
   profilePic: string;
   sex: string;
   dateOfBirth: Date;
   enrollmentDate: Date;
   naCategory: string;
   naSubCategory: string;
   ageGroup: string;
   certification: string;
   board: string;
   academyTypeId: number;
   subjects: string;
   level: string;
   isTutorBefore: true;
   professionalDescription: string;
   highestEducation: string;
   preference: string;
   availableDays: string;
   preferredDistance: number;
   preferredTimeSlot: string;
   hourlyRate: number;
   currency: string;
   idType: string;
   idDoc: string;
   demoLink: string;
   intersets: string;
   medium: string;
}
