import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { Client } from '../models/client';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Router } from '@angular/router';

const httpOptions =
  {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    responseType: 'json' as 'json'
  };
@Injectable()
export class ClientService {
  clients :Client[];
  lat:string;
  lng:string;
  
  constructor( private http:HttpClient,private router:Router) { }
  addClient(client) {
    const uri = 'http://localhost:18080/21meeseeks-web/rest/client';

    this.http.post(uri, client,httpOptions)
        .subscribe(res =>  this.router.navigate(['/Client/Single',res['idUser']]));
  }
  getAllClients(): any{
   return this.http.get('http://localhost:18080/21meeseeks-web/rest/client');
  }
  archiveClient(id)
  {

  }
  editClient(c:Client)
  {

  }
  getLatLng(place_name):any
  {//Tucson, Arizona, United States
     this.http.get('http://www.mapquestapi.com/geocoding/v1/address?key=02XNZK5GTJ5C3iZhVyfa9o1teGm7LmUw&location='+place_name).subscribe(data => {
      this.lat=  data['results'][0]['locations'][0]['latLng']['lat'];
      this.lng= data['results'][0]['locations'][0]['latLng']['lng'];

     });;

  }



}
