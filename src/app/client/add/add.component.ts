import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/client';
import { FormGroup, FormControl } from '@angular/forms';
import * as mapboxgl from 'mapbox-gl';
// if not using * as, will cause MapboxGeocoder is undefined
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  validgeo:boolean=false;
  marker:any=null;
  storeData: any;
  map: mapboxgl.Map=null;
  selectedLink: number;
  mapshown:boolean=false;
  lat:string;
  lng:string;
  newclient:Client=new Client();
  geocoder:any;
  geoinput:string= '';
  constructor(private cs:ClientService) { }
  bounds:any = [
    [-180,-60],[180,80] // Northeast coordinates
];

  submitted = false;

  onSubmit() { this.submitted = true;
  console.log(this.newclient);
  this.addclient();
  }
  
  ngOnInit() {
    


    mapboxgl.accessToken = 'pk.eyJ1IjoibWF0dHpoZW5nMjUiLCJhIjoiY2o1Y3B3YzBrMGNsZDJ3bzg1ZDBjOGxvbiJ9.HjOovjGYk7y6ExHFt3Rv2w';

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
   this.map.addControl(this.geocoder);
   this.geocoder.on('result', () => this.foundit()
      );
 
  
  }
  foundit()
  {console.log(this.geocoder._typeahead.selected['place_name']);
  var el = document.createElement('div');
 el.className = 'marker';
 if(this.marker)
 {
 this.marker.remove()  }
 var el = document.createElement('div');
el.className = 'marker';
el.style.width='20px';
el.style.height='20px';
el.style.borderRadius='50px';
el.style.border='3px solid red'

 this.marker =new mapboxgl.Marker(el)
    .setLngLat([this.geocoder._typeahead.selected.center[0], this.geocoder._typeahead.selected.center[1]])
    .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
    .setHTML('<div class="marker"><h4>' + this.geocoder._typeahead.selected['place_name'] + '</h4><p>' + 'hi' + '</p></div>'))
    .addTo(this.map);
  this.newclient.address=this.geocoder._typeahead.selected['place_name'];
    if(this.geocoder._typeahead.selected)
    {
    this.validgeo=true;}
}
getclass()
{
  if (this.validgeo) return "req"
  else return "reqinvalid"
}
  addclient()
  { 
    this.cs.addClient(JSON.stringify(this.newclient));
    console.log("hello");

  }
  get diagnostic() { return JSON.stringify(this.newclient); }
  ngAfterViewInit() {


  }
  
  onClick(event) {
    console.log("test");
  }
  addline(origin)
  {
    var geojson = {
      "type": "FeatureCollection",
      "features": [{
          "type": "Feature",
          "properties": {},
          "geometry": {
              "coordinates": [
                 origin,
                  [-77.033643, 38.899926 ]
              ],
              "type": "LineString"
          }
      }]
    };
    this.map.addSource('line', {
      type: 'geojson',
      lineMetrics: true,
      data: geojson
  });

  // the layer must be of type 'line'
  this.map.addLayer({
      type: 'line',
      source: 'line',
      id: 'line',
      paint: {
          'line-color': 'white',
          'line-width': 3
      },
      layout: {
          'line-cap': 'round',
          'line-join': 'round'
      }
  });
  }
}
