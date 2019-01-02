import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../project.service';
import { SelectItem } from 'primeng/components/common/selectitem';
import { Organigram } from '../../models/organigram';
import { Rresources } from '../../models/rresources';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
shown:boolean=true;
  organigrams:Organigram[]=[];
  projects: Project[]=[];
  resources:Rresources[]=[];
  selectedOrganigram:Organigram=new Organigram();
  selectedor:Rresources[]=[];
  constructor(private ps:ProjectService) { }

  ngOnInit() {
    this.ps.getProjects().subscribe(result => {
      this.organigrams = result as Organigram[];
      
  });
  this.ps.getResources().subscribe(result => {
    this.resources = result as Rresources[];

});
  
  }

  getlength(array)
  {
return (array.length);
  }
  getproject(o:Organigram)
  {
    if(o.project)
    {if(o.project.client)
      {
      return o.project.client.clientName;
    }else return "no client"
    } else return "no project"
  }

  addr()
  {
  
  
  }
  showform(sr)
  { this.selectedor=this.resources;
    for (let entry of sr) {
      if(this.selectedor.some(item=> item==entry))
      {
      this.selectedor = this.selectedor.filter(item=> item==entry);
      }
      console.log(entry); // 1, "string", false
  }
      this.shown=false;
  }
  cancelform()
  {
    this.shown=true;
  }
}



