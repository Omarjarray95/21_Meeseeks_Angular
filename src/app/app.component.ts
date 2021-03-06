import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []

})
export class AppComponent
{

   loggedin ="";
  constructor( private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title)
  {
    localStorage.setItem('loggedin', "true");
    
  }
  ngOnInit() {
    this.loggedin = localStorage.getItem('loggedin');
        this.loggedin="true"
    this.router.events.filter((event) => event instanceof NavigationEnd)
    .map(() => this.activatedRoute)
    .map((route) => {
      while (route.firstChild) route = route.firstChild;
      return route;
    })
    .filter((route) => route.outlet === 'primary')
    .mergeMap((route) => route.data)
    .subscribe((event) => this.titleService.setTitle(event['title'])); }
}
