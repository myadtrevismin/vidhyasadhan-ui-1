import { Demo } from './demo';

export interface DemoRequest{
     requestId?: number;
     tutorId: string;
     tutor?: any;
     studentId: string;
     student?: any;
     date: Date;
     slot: string;
     subject: string;
     message: string;
     status?: any;
     course?: Demo;
}