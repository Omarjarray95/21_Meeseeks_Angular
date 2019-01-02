import { Component, OnInit } from '@angular/core';
import { Client } from '../../models/client';
import { FormGroup, FormControl } from '@angular/forms';
import * as mapboxgl from 'mapbox-gl';
import { ClientService } from '../../services/client.service';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { CssSelector } from '@angular/compiler';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.css']
})
export class SingleComponent implements OnInit {
  marker:any=null;
  storeData: any;
  map: mapboxgl.Map=null;
  selectedLink: number;
  mapshown:boolean=false;
  lat:string;
  lng:string;
  newclient:Client=new Client();
  clients:Client[];
  geocoder:any;
  id:number;

  bounds:any = [
    [-180,-60],[180,80] // Northeast coordinates
];
  constructor(private cs:ClientService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params) //log the entire params object
      console.log(params['id']) //log the value of id
      this.id=params['id'];
      this.cs.getAllClients().subscribe(result => {
        this.clients = result as Client[];
        this.newclient=this.clients.filter(x => x.idUser == this.id)[0];
    });
   
      
  });    mapboxgl.accessToken = 'pk.eyJ1IjoibWF0dHpoZW5nMjUiLCJhIjoiY2o1Y3B3YzBrMGNsZDJ3bzg1ZDBjOGxvbiJ9.HjOovjGYk7y6ExHFt3Rv2w';
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/dark-v9',
      center:   [-77.044211, 38.852924 ], // [lng, lat]
      zoom: 3, // starting zoom
      scrollZoom: true,
      maxBounds: this.bounds // Sets bounds as max
    });
    this.geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken
  });

  this.map.on('load', () => this.putmarker()

  );
  }
async putmarker()
{
  this.cs.getLatLng(this.newclient.address);
  await delay(3000);
  var el = document.createElement('div');
  el.className = 'marker';
  el.style.width='20px';
  el.style.height='20px';
  el.style.borderRadius='50px';
  el.style.border='3px solid red'
  new mapboxgl.Marker(el)
  .setLngLat([this.cs.lng,this.cs.lat])
  .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
  .setHTML('<div class="marker"><h3>' + "hello" + '</h3><p>' + 'hi' + '</p></div>'))
  .addTo(this.map);
  this.map.flyTo({
    center: [this.cs.lng,this.cs.lat],
    zoom:9
});

    
}
}
function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
 }