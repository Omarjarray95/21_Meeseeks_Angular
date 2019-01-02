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
import { ClientService } from './services/client.service';
import { ListComponent } from './client/list/list.component';
import { SingleComponent } from './client/single/single.component';
import { MapviewComponent } from './client/mapview/mapview.component';
import { ProjectListComponent } from './project/project-list/project-list.component';
import { ProjectSingleComponent } from './project/project-single/project-single.component';
import { ProjectAddComponent } from './project/project-add/project-add.component';
import { ProjectService } from './project/project.service';

const routes: Routes = [
  { path: 'home', component: HomeComponent, data: { title: 'LEVIO - Log In' } },
  { path: 'login', component: LoginComponent, data: { title: 'LEVIO - Home' } },
  { path: 'Client/List', component: ListComponent, data: { title: 'Client - List' } },
  { path: 'Client/Add', component: AddComponent, data: { title: 'Client - Add' } },
  { path: 'Client/Single/:id', component: SingleComponent, data: { title: 'Client - Single' } },
  { path: 'Client/Map', component:MapviewComponent, data: { title: 'Client - MapView' } },
  { path: 'Project/List', component:ProjectListComponent, data: { title: 'Projects - List' } },
  { path: 'Project/Add', component:ProjectAddComponent, data: { title: 'Projects - Add' } },
  { path: 'Project/Single/:id', component:ProjectSingleComponent, data: { title: 'Projects - Single' } }


  
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
    AddComponent,
    ListComponent,
    SingleComponent,
    MapviewComponent,
    ProjectListComponent,
    ProjectSingleComponent,
    ProjectAddComponent
    
    ],
  imports: [
    BrowserModule, RouterModule.forRoot(routes), FormsModule, ReactiveFormsModule, HttpClientModule, StorageServiceModule
  ],
  providers: [LoginService,ClientService,ProjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
