import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/client';
import * as mapboxgl from 'mapbox-gl';
// if not using * as, will cause MapboxGeocoder is undefined
import { environment } from '../../../environments/environment.prod';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
    clients:Client[]=[];
    storeData: any;
    map: mapboxgl.Map;
    selectedLink: number;
    mapshown:boolean=false;
    lat:string;
    lng:string;
    marker:any;
    bounds:any = [
      [-180,-60],[180,80] // Northeast coordinates
  ];
  constructor(private cs:ClientService) {  }

  ngOnInit() {
    this.cs.getAllClients().subscribe(result => {
      this.clients = result as Client[];
  });
  this.selectedLink = null;
  mapboxgl.accessToken = 'pk.eyJ1IjoibWF0dHpoZW5nMjUiLCJhIjoiY2o1Y3B3YzBrMGNsZDJ3bzg1ZDBjOGxvbiJ9.HjOovjGYk7y6ExHFt3Rv2w';
  this.map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v9',
    center: [-77.034084, 38.909671], // [lng, lat]
    zoom: 3, // starting zoom
    scrollZoom: true,
    maxBounds: this.bounds // Sets bounds as max
  });
  
  }
  
  async showmap(address)
  {    this.mapshown=true;

    if(this.marker)
    {
    this.marker.remove()  }
    this.cs.getLatLng(address);
    await delay(2000);
    var el = document.createElement('div');
el.className = 'marker';
el.style.width='20px';
el.style.height='20px';
el.style.borderRadius='50px';
el.style.border='3px solid red'
    this.marker =new mapboxgl.Marker(el)
       .setLngLat([this.cs.lng, this.cs.lat])
       .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
       .setHTML('<div class="marker"><h4>' + address + '</h4><p>' + 'hi' + '</p></div>'))
       .addTo(this.map);
       this.map.flyTo({
        center: [this.cs.lng, this.cs.lat],
        zoom:9
    });
          this.lat=this.cs.lat;
          this.lng==this.cs.lng
      //  this.lat.replace('.',',');
        console.log(Number(this.lat));
  
  
  
  }
  closemap()
  {
  
    this.mapshown=false;

  }
}
async function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}