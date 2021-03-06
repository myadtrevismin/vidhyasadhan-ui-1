import { Calendar } from './calendar';
import { User } from './user';

export interface Demo{
    courseId: string;
    title: string;
    courseDescription: string;
    startDate: Date;
    endDate: Date;
    startTime: string;
    endTime: string;
    credits: number;
    departmentID: number;
    courseAssignments: CourseAssignment[];
    enrollments: Enrollment[];
    calendarEvent: Calendar;
    locationId: string;
    locationName: string;
    langitude: string;
    latitude: string;
    isDemo: boolean;
    grade?: string;
    subject?: string;
    isOnline: boolean;
    status?: number;
}

export interface CourseAssignment{
    instructorID: string;
    courseID: number;
    instructor?: User;
}

export interface Enrollment{
    enrollmentID?: number;
    courseID: number;
    studentID: string;
    student?: User;
    status?: number;
}

