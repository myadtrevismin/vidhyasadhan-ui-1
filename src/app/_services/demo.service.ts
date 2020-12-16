import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthserviceService } from './authservice.service';
import { environment } from 'src/environments/environment';
import { Demo } from '../_models/demo';
import { DemoRequest } from '../_models/demorequest';

@Injectable({
  providedIn: 'root'
})
export class DemoService {

  constructor(private http: HttpClient, private authService: AuthserviceService) { }

  getAllDemos(){
    return this.http.get<any>(`${environment.apiUrl}/demos/allcourses`);
  }

  getDemoById(id){
    return this.http.get<any>(`${environment.apiUrl}/vevent`, {
      withCredentials: true,
      params: new HttpParams().set('id', id)
    });
  }

  getAllDemosByUser(userid){
    const options = userid ?
    { params: new HttpParams().set('id', userid)} : {};
    return this.http.get<Demo[]>(`${environment.apiUrl}/vevent/byuser`, options);
  }

  getAllDemosByloggedUser(){
  }

  createDemo(demo){
    return this.http.post<any>(`${environment.apiUrl}/vevent`, demo);
  }

  requestDemo(demo){
    return this.http.post<any>(`${environment.apiUrl}/request`, demo, {
      withCredentials: true
    });
  }

  getDemoRequests(userId){
    const options = userId ?
    { params: new HttpParams().set('id', userId)} : {};

    return this.http.get<DemoRequest[]>(`${environment.apiUrl}/request/byuser`, {
      withCredentials: true,
      params: options.params
    });
  }
}
