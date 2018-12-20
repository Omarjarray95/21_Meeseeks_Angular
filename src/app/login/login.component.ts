import {Component, Inject, OnInit} from '@angular/core';
import {LoginService} from '../services/login.service';
import {Router} from '@angular/router';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit
{
  model: any = {};
  public data: any=[];
  constructor(private loginService: LoginService, private router: Router, @Inject(LOCAL_STORAGE) private storage: WebStorageService)
  {

  }

  ngOnInit()
  {

  }

  Login()
  {
    this.loginService.Connect(this.model.email, this.model.password).subscribe(
      response => this.GoHome(response),
      error =>  console.log(error)
    );
  }

  GoHome(response: string)
  {
    this.storage.set('Token', response);
    this.router.navigate(['home']);
  }

}
