import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../project.service';
import { Organigram } from '../../models/organigram';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/client';
import { Rresources } from '../../models/rresources';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.css']
})
export class ProjectAddComponent implements OnInit {
  neworganigram:Organigram=new Organigram();
  clients:Client[];
  resources:Rresources[];
  selected:Rresources[];
  today:any;
  constructor(private cs:ClientService,private ps:ProjectService) { }

  ngOnInit() {
    
    this.neworganigram.project=new Project();
    this.neworganigram.project.client=new Client();
    this.cs.getAllClients().subscribe(result => {
      this.clients = result as Client[];
      this.today=new Date().toJSON().split('T')[0];
  });
  this.ps.getResources().subscribe(result => {
    this.resources = result as Rresources[];
});
  }
  submitted = false;

  onSubmit() { this.submitted = true;
    console.log(this.neworganigram);
   this.addproject();
    }
    addproject()
    { this.ps.o=this.neworganigram;
      this.ps.p=this.neworganigram.project;
      this.ps.r=this.selected;
      this.ps.addClient();
  
    }
}
