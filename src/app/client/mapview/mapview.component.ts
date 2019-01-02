import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/client';
import * as mapboxgl from 'mapbox-gl';
// if not using * as, will cause MapboxGeocoder is undefined
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { environment } from '../../../environments/environment.prod';
@Component({
  selector: 'app-mapview',
  templateUrl: './mapview.component.html',
  styleUrls: ['./mapview.component.css']
})
export class MapviewComponent implements OnInit {
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
  mapboxgl.accessToken = 'pk.eyJ1IjoibWF0dHpoZW5nMjUiLCJhIjoiY2o1Y3B3YzBrMGNsZDJ3bzg1ZDBjOGxvbiJ9.HjOovjGYk7y6ExHFt3Rv2w';
  this.map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v9',
    center: [-77.034084, 38.909671], // [lng, lat]
    zoom: 3, // starting zoom
    scrollZoom: true,
    maxBounds: this.bounds // Sets bounds as max
  });
  this.map.resize();
  this.map.addControl(new mapboxgl.FullscreenControl());
  this.map.on('load', () => this.fillmarkers()

  );
}
async fillmarkers()
{  await delay(1000);

  for (let entry of this.clients) {
    this.cs.getLatLng(entry.address);
    await delay(1000);
   
    var el = document.createElement('div');
    el.className = 'marker';
    el.style.width='20px';
    el.style.height='20px';
    el.style.content='test';
    el.style.borderRadius='50px';
    el.style.border='3px solid #A94442';
    new mapboxgl.Marker(el).setLngLat([this.cs.lng,this.cs.lat]).setPopup(new mapboxgl.Popup({ offset: 25 })
    .setHTML('<div class="marker"><h3>' +entry.clientName + '</h3><p>' +'Client' + '</p></div>'))
    .addTo(this.map);
  
  
  
  
  
  
  }
  }
  }
  function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
   }