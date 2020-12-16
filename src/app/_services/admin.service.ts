import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthserviceService } from './authservice.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient, private authService: AuthserviceService) { }

  getadminData(){
    return this.http.get<any>(`${environment.apiUrl}/admin`, {
      withCredentials: true
    });
  }

  updateTutor(request){
    return this.http.post<any>(`${environment.apiUrl}/admin/approve/tutor`, request, {
      withCredentials: true
    });
  }
}
