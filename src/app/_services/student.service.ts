import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthserviceService } from './authservice.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient, private authService: AuthserviceService) { }

  saveEnrollment(enrollment){
    return this.http.post<any>(`${environment.apiUrl}/enrollments`, enrollment, {
      withCredentials: true
    });
  }

  updateEnrollment(enrollment){
    return this.http.put<any>(`${environment.apiUrl}/enrollments`, enrollment, {
      withCredentials: true
    });
  }

  getenrollmentsbyTutor(tutorid){
    const options = tutorid ?
    { params: new HttpParams().set('tutorId', tutorid)} : {};
    return this.http.get<any>(`${environment.apiUrl}/students/bytutor`, options);
  }

  getEnrollmentsbyStudent(studentId){
    const options = studentId ?
    { params: new HttpParams().set('id', studentId)} : {};
    return this.http.get<any>(`${environment.apiUrl}/enrollments/bystudent`, {
      withCredentials: true,
      params: options.params
    });
  }

  getRequestsbyStudent(studentId){
    return this.http.get<any>(`${environment.apiUrl}/request/byuser`, {
      withCredentials: true,
      params: new HttpParams().set('id', studentId)
    });
  }

}
