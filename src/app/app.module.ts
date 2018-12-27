import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { StorageServiceModule} from 'angular-webstorage-service';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './services/login.service';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { AsideComponent } from './layouts/aside/aside.component';
import { MainComponent } from './main/main.component';
import { SubheaderComponent } from './layouts/subheader/subheader.component';
import { AddComponent } from './client/add/add.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, data: { title: 'LEVIO - Log In' } },
  { path: 'login', component: LoginComponent, data: { title: 'LEVIO - Home' } },
  { path: 'add', component: AddComponent, data: { title: 'LEVIO - Home' } }

  
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AsideComponent,
    MainComponent,
    SubheaderComponent,
    AddComponent
    ],
  imports: [
    BrowserModule, RouterModule.forRoot(routes), FormsModule, ReactiveFormsModule, HttpClientModule, StorageServiceModule
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
