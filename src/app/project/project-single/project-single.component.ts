import { Component, OnInit } from '@angular/core';
import { Organigram } from '../../models/organigram';
import { ProjectService } from '../project.service';
import { ActivatedRoute } from '@angular/router';
import * as mapboxgl from 'mapbox-gl';
import { ClientService } from '../../services/client.service';
import { elementProperty } from '@angular/core/src/render3/instructions';
@Component({
  selector: 'app-project-single',
  templateUrl: './project-single.component.html',
  styleUrls: ['./project-single.component.css']
})
export class ProjectSingleComponent implements OnInit {
  os:Organigram[];
  o:Organigram;
  storeData: any;
  map: mapboxgl.Map;
  selectedLink: number;
  mapshown:boolean=false;
  lat:string;
  lng:string;
  clat:string;
  clng:string;
  marker:any;
  bounds:any = [
    [-180,-60],[180,80] // Northeast coordinates
];
  constructor(private ps:ProjectService,private route: ActivatedRoute,private cs:ClientService) { }

  ngOnInit() {
    mapboxgl.accessToken = 'pk.eyJ1IjoibWF0dHpoZW5nMjUiLCJhIjoiY2o1Y3B3YzBrMGNsZDJ3bzg1ZDBjOGxvbiJ9.HjOovjGYk7y6ExHFt3Rv2w';
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/dark-v9',
      center: [-77.034084, 38.909671], // [lng, lat]
      zoom: 1, // starting zoom
      scrollZoom: true,
      maxBounds: this.bounds // Sets bounds as max
    });
    this.map.resize();
    this.map.addControl(new mapboxgl.FullscreenControl());

  this.route.params.subscribe(params => {
    console.log(params) //log the entire params object
    console.log(params['id']) //log the value of id
    this.ps.getProjects().subscribe(result => {
      this.os = result as Organigram[];
      this.o=this.os.filter(x => x.idOrganigram == params['id'])[0];
        this.putmarker();
  });})
}

async putmarker()
{
  this.cs.getLatLng(this.o.project.client.address);
  await delay(3000);
  
  var el = document.createElement('div');
  el.className = 'marker';
  el.style.width='20px';
  el.style.height='20px';
  el.style.borderRadius='50px';
  el.style.border='3px solid #F4516C';
    new mapboxgl.Marker(el).setLngLat([this.cs.lng,this.cs.lat]).setPopup(new mapboxgl.Popup({ offset: 25 })
  .setHTML('<div class="marker"><h3>' + '<a href="http://localhost:4200/Client/Single/'+this.o.project.client.idUser+'">'+this.o.project.client.clientName+'</a>' + '</h3><p>' + 'Client' + '</p></div>'))
  .addTo(this.map);
  this.clat=this.cs.lat;
  this.clng=this.cs.lng;

  this.map.flyTo({
    center: [this.cs.lng,this.cs.lat],
    zoom:9
});

for (let entry of this.o.ressources) {
  this.cs.getLatLng(entry.address);
  await delay(1000);
  var color;
  if(entry.contractType=="Freelancer")
  {
      color="#00BFFF"
  }
  else{color="green"}
  var el = document.createElement('div');
  el.className = 'marker';
  el.style.width='20px';
  el.style.height='20px';
  el.style.content='test';
  el.style.borderRadius='50px';
  el.style.border='3px solid '+color;
  new mapboxgl.Marker(el).setLngLat([this.cs.lng,this.cs.lat]).setPopup(new mapboxgl.Popup({ offset: 25 })
  .setHTML('<div class="marker"><h3>' + entry.firstName+" "+entry.lastName + '</h3><p>' + entry.contractType + '</p></div>'))
  .addTo(this.map);


  this.map.addLayer({
    "id": entry.email,
    "type": "line",
    "source": {
        "type": "geojson",
        "data": {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    [this.clng, this.clat],
                    [this.cs.lng, this.cs.lat]
                ]
            }
        }
    },
    "layout": {
        "line-join": "round",
        "line-cap": "round",
        'visibility': 'visible'
    },
    "paint": {
        "line-color": color,
        "line-width": 1
    }
  });




}
}
}
function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
 }