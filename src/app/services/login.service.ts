import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

const httpOptions =
  {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }),
    responseType: 'text' as 'text'
  };

@Injectable()
export class LoginService
{

  constructor(private http: HttpClient)
  {

  }

  Connect(email, password): Observable<any>
  {
    const body = new HttpParams()
      .set('username', email)
      .set('password', password);

    return this.http.post('http://localhost:18080/21meeseeks-web/rest/authentication',
      body,
      httpOptions
    );

  }

}
