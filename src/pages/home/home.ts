import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { GoogleMap, GoogleMapsEvent, GoogleMapsLatLng } from 'ionic-native';
import { Vibration } from '@ionic-native/vibration';
import { Geolocation } from '@ionic-native/geolocation';
//import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';

import { SetAlarmPage } from '../set-alarm/set-alarm';



@Component({
  selector: 'pafe-home',
  templateUrl: 'home.html'
})
export class HomePage {

    map: GoogleMap;
    destination: any;

    constructor(private geolocation: Geolocation, private vibration: Vibration, public navCtrl: NavController, public platform: Platform) {

        platform.ready().then(() => {
            this.loadMap();
        });
    }

    setAlarm() {
        this.navCtrl.push(SetAlarmPage,{
          destination: this.destination
        })

      }

      vibrate() {
    this.vibration.vibrate(3000)
  }

    loadMap(){

        let location = new GoogleMapsLatLng(-34.9290,138.6010);

        this.map = new GoogleMap('map', {
          'backgroundColor': '#4DC68F',
          'controls': {
            'compass': true,
            'myLocationButton': true,
            'indoorPicker': true,
            'zoom': true
          },
          'gestures': {
            'scroll': true,
            'tilt': true,
            'rotate': true,
            'zoom': true
          },
          'camera': {
            'latLng': location,
            'zoom': 15.4,
            'bearing': 50,
            'tilt': 30
          }
        });

        this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
            console.log('Map is ready!');
        });

    }



    checkdistance() {
    let lat1;
    let lon1;
    let temp = this.destination.split(",")
    let lat2 = temp[0];
    let lon2 = temp[1];
      this.geolocation.getCurrentPosition().then((resp) => {

    lat1= resp.coords.latitude;
    lon1 = resp.coords.longitude;

    }).catch((error) => {
    console.log('Error getting location', error);
    });

      if (this.getDistance(lat1,lon1,lat2,lon2)<= 1.60934){
        this.vibration.vibrate(10000)

      }





    }
    getDistance(lat1,lon1,lat2,lon2) {
    let R = 6371; // Radius of the earth in km
    let dLat = this.deg2rad(lat2-lat1);
    let dLon = this.deg2rad(lon2-lon1);
    let a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ;
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    let d = R * c;
    return d;
   }

   deg2rad(deg) {
    return deg * (Math.PI/180)
   }



}
