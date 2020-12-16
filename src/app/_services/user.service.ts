import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../_models/user';
import { environment } from 'src/environments/environment';
import { Profile } from '../_models/profile';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private registerSubject: BehaviorSubject<any>;

  get(id) {
    return this.http.get<User>(`${environment.apiUrl}/profile/` + id);
  }

  getStudents() {
    return this.http.get<User[]>(`${environment.apiUrl}/users/students`);
  }

   getTutors() {
    return this.http.get<any>(`${environment.apiUrl}/instructors`);
  }

  getAll() {
    return this.http.get<User[]>(`${environment.apiUrl}/users/allusers`);
  }

  getUserByRole(role){
    const options = { params: new HttpParams().set('role',  role) };
    return this.http.get<any>(`${environment.apiUrl}/accounts/byrole`, {
      withCredentials: true,
      params: options.params
    });
  }

  addUser(user: User){
    return this.http.post<boolean>(`${environment.apiUrl}/users/register`, user);
  }

  register(model) {
    return this.http.post<any> (`${environment.apiUrl}/accounts/register`, model, {
      withCredentials: true
    });
  }

  getProfileData(userid){
    const options = userid ?
    { params: new HttpParams().set('id', userid) } : {};
    return this.http.get<Profile>(`${environment.apiUrl}/profile/` + userid);
  }

  updateProfileData(profile){
    return this.http.post<any>(`${environment.apiUrl}/profile`, profile, {
      withCredentials: true
    });
  }

  updateUser(){

  }

  deleteUser(){
  }

  uploadprofilepic(file){
    return this.http.post<User>(`${environment.cloudinary.url}/upload`, file);
  }

}
