import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthserviceService } from './authservice.service';
import { environment } from 'src/environments/environment';
import { Calendar, CalendarResponse } from '../_models/calendar';
import { Demo } from '../_models/demo';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient, private authService: AuthserviceService) {
  }

  getAllCourses(){
    return this.http.get<any>(`${environment.apiUrl}/courses/allcourses`);
  }

  getAllCoursesByUser(userid){
      const options = userid ? { params: new HttpParams().set('id', userid)} : {};
      return this.http.get<Demo[]>(`${environment.apiUrl}/vevent/byuser`, options);
  }

  getAllCoursesByloggedUser(){
  }

  createCourse(course){
    return this.http.post<any>(`${environment.apiUrl}/courses​/create`, course);
  }

  getCalendars(){
    return this.http.get<any>(`${environment.apiUrl}/Calendar`);
  }

  getCalendarById(userId){
    return this.http.get<CalendarResponse>(`${environment.apiUrl}/Calendar`);
  }

  createCalendar(calendar){
    return this.http.post<any>(`${environment.apiUrl}/Calendar`, calendar);
  }

  createAssignment(assignment){
    return this.http.post<any>(`${environment.apiUrl}/assignment`, assignment, {
      withCredentials: true,
    });
  }

  addstudentstoassignment(assignments){
    return this.http.post<any>(`${environment.apiUrl}/studentassignments`, assignments, {
      withCredentials: true
    });
  }

  getAssignmentByTutor(userId){
    const options = userId ?
      { params: new HttpParams().set('id', userId)} : {};
    return this.http.get<any>(`${environment.apiUrl}/assignment/bytutor`, {
      withCredentials: true,
      params: options.params
    });
  }

  getAssignmentByUser(userId){
    const options = userId ?
      { params: new HttpParams().set('id', userId)} : {};
    return this.http.get<any>(`${environment.apiUrl}/assignment`, options);
  }

  getStudentAssignments(userId){
    return this.http.get<any>(`${environment.apiUrl}/studentassignments/bystudent`, {
      withCredentials: true,
      params: new HttpParams().set('id', userId)
    });
  }

  updateStudentAssignments(assignment){
    return this.http.put<any>(`${environment.apiUrl}/studentassignments`, assignment, {
      withCredentials: true
    });
  }

  getTutorStudentAssignments(userId){
    return this.http.get<any>(`${environment.apiUrl}/studentassignments/bytutor`, {
      withCredentials: true,
      params: new HttpParams().set('id', userId)
    });
  }

}
