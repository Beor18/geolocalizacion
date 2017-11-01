import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation, Geoposition } from "@ionic-native/geolocation";

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  map: any;
  constructor(
    public navCtrl: NavController,
    private geolocation: Geolocation
  ) {}

  ionViewDidLoad(){
    this.getPosition();
  }

  getPosition(): void{
    this.geolocation.getCurrentPosition()
    .then(response => {
      this.loadMap(response);
    })
    .catch(error => {
      //console.log(error);
    })
  }

  loadMap(position: Geoposition){

    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      data.coords.latitude;
      data.coords.longitude;
    });

    console.log(latitude, longitude);

    let mapEle: HTMLElement = document.getElementById('id');

    let myLatLng = {lat: latitude, lng: longitude};

    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 12
    });

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      new google.maps.Marker({
        position: myLatLng,
        map: this.map,
        title: 'Hola Gil'
      });
      mapEle.classList.add('show-map');
    });
  }

}
