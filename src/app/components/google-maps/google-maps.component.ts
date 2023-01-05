import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss'],
})
export class GoogleMapsComponent implements OnInit {
  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) info!: MapInfoWindow;
  zoom = 12;
  center!: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 150,
    minZoom: 8,
  };
  markers: any[]= [];
  infoContent = '';
  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });
  }
  logCenter() {
    console.log(JSON.stringify(this.map.getCenter()))
  }

  zoomIn() {
    if (this.options.maxZoom && (this.zoom < this.options.maxZoom)) this.zoom++;
  }

  zoomOut() {
    if (this.options.minZoom && (this.zoom > this.options.minZoom)) this.zoom--;
  }
  addMarker() {
    this.markers.push({
      position: {
        lat: this.center.lat,
        lng: this.center.lng,
      },
      label: {
        color: 'red',
        text: 'Marker label ' + (this.markers.length + 1),
      },
      title: 'Marker title ' + (this.markers.length + 1),
      info: 'Marker info ' + (this.markers.length + 1),
      options: { animation: google.maps.Animation.BOUNCE },
    });

  }
  openInfo(marker: MapMarker, content: any) {
    this.infoContent = content
    this.info.open(marker)
  }
}