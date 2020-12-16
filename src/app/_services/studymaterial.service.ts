import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudymaterialService {

  constructor(private http: HttpClient) { }

  getMaterials(){
    return this.http.get<any>(`${environment.apiUrl}/material`);
  }
}
