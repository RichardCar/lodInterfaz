import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  getResources(query: any) {
    console.log(query);
    const headers = new HttpHeaders( {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    });
    return this.http.post(environment.endpoint, query, {headers: headers});
  }
}
