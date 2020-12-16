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
    selectedDays?: string;
    courseAssignments?: CourseAssignment[];
    enrollments: Enrollment[];
    calendarEvent?: Calendar;
    locationId: string;
    locationName: string;
    langitude: string;
    latitude: string;
    isDemo: boolean;
    grade?: string;
    subject?: string;
    isOnline: boolean;
    status?: number;
    ownerId?: number;
    eventType?: number;
}

export interface CourseAssignment{
    instructorID: string;
    courseID: number;
    instructor?: User;
}

export interface Enrollment{
    id?: number;
    eventId: number;
    studentID: string;
    account?: User;
    status?: number;
    enrollmentDate?: Date;
    updateDate?: Date;
    event?: any;
    requestId?: number;
}

