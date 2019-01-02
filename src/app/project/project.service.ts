import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Project } from '../models/project';
import { Organigram } from '../models/organigram';
import { Rresources } from '../models/rresources';
import { Router } from '@angular/router';
const httpOptions =
  {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    responseType: 'json' as 'json'
  };
@Injectable()
export class ProjectService {
o:Organigram;
p:Project;
r:Rresources[];

  constructor(private http: HttpClient,private router: Router) {this.o=new Organigram(); this.o.project=new Project();}
  getProjects():any {
    return this.http.get('http://localhost:18080/21meeseeks-web/rest/organigram');
}
getResources():any {
  return this.http.get('http://localhost:18080/21meeseeks-web/rest/organigram/res');
}
addClient() {
  console.log("test 1");

  const uri = 'http://localhost:18080/21meeseeks-web/rest/project';

  this.http.post(uri,this.p,httpOptions)
      .subscribe(res => this.addOrganigram(res['idProject']));
}
addOrganigram(id:number) {
  console.log("test 2");

  this.o.project.idProject=id;
  const uri = 'http://localhost:18080/21meeseeks-web/rest/organigram';

  this.http.post(uri,this.o,httpOptions)
      .subscribe(res => this.addres(res['idOrganigram']));
}
addres(id:number) {
  console.log("test 3");
  this.o.idOrganigram=id;
  this.o.ressources=this.r;
  const uri = 'http://localhost:18080/21meeseeks-web/rest/organigram/addresources';
console.log(this.o.ressources);
  this.http.post(uri,JSON.stringify(this.o),httpOptions)
      .subscribe(res =>     this.router.navigate(['/Project/Single',id]));
}
}

