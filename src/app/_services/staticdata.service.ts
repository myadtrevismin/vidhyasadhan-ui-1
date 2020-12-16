import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { StaticData, State, Country, Statistics } from '../_models/static';
import { environment } from 'src/environments/environment';
import { isString, isNullOrUndefined } from 'util';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StaticdataService {

  staticData: StaticData;
  states: State[] = [];
  country: Country[] = [];
  constructor(private http: HttpClient) { }

  getStaticData(){
    return this.http.get<StaticData>(`${environment.apiUrl}/resourses/staticdata`);
  }

  getStates(){
    return this.http.get<State>(`${environment.apiUrl}/resourses/states`);
  }

  getCountries(){
    return this.http.get<Country>(`${environment.apiUrl}/resourses/countries`);
  }

  searchLocations(location: string) {

    if (location?.length > 0){
      const options = { params: new HttpParams().set('access_token', environment.mapbox_accessToken) };
      return this.http.get<any>(environment.mapbox_api + 'mapbox.places/' + location + `.json`, options);
    }
    return of([]);
  }

  getNotifications(userId){
    const options = { params: new HttpParams().set('userId', userId) };
    return this.http.get<any>(`${environment.apiUrl}/static/appnotifications`, options);
  }

  getStaticDataSets(){
    return this.http.get<StaticData>(`${environment.apiUrl}/static/data`);
  }

  getStatistics(userId){
    const options = { params: new HttpParams().set('userId',  userId) };
    return this.http.get<Statistics>(`${environment.apiUrl}/static/statistics`, options);
  }


}
