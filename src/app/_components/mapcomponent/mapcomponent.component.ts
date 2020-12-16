import { Component, OnInit, Input } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { Demo } from 'src/app/_models/demo';

@Component({
  selector: 'app-mapcomponent',
  templateUrl: './mapcomponent.component.html',
  styleUrls: ['./mapcomponent.component.css']
})
export class MapcomponentComponent implements OnInit {

  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 17.36667;
  lng = 78.46667;

  @Input()
  markersdata: any;

  constructor() { }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition(position => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
    });
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 13,
      center: [this.lng, this.lat],
      accessToken: environment.mapbox_accessToken,
  });

    console.log(this.markersdata);
  // Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());
    this.markersdata.forEach(x => {
      if (x.event?.langitude > 0 && x.event?.latitude > 0 ){
        const marker = new mapboxgl.Marker().setLngLat([Number(x.event?.langitude), Number(x.event?.latitude)]).addTo(this.map);
      }
    });
  }

}
