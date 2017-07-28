import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Vibration } from '@ionic-native/vibration';
import { Geolocation } from '@ionic-native/geolocation';

import { HomePage } from '../home/home';



@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(private geolocation: Geolocation, private vibration: Vibration, public navCtrl: NavController) {

  }
  home() {
      this.navCtrl.popToRoot(HomePage)

    }

  vibrate() {
    this.vibration.vibrate(3000)
  }










//  distance(){
//    let usersLocation;
// this.geolocation.getCurrentPosition().then((position) => {
//
//    usersLocation = { lat :position.coords.latitude ,  lng : position.coords.longitude }
//    locations.map((location) => {
//
//     let placeLocation = {
//       lat: location.latitude,
//       lng: location.longitude
//     };
//
//     location.distance = this.getDistanceBetweenPoints(
//         usersLocation,
//         placeLocation,
//         'miles'
//     ).toFixed(2);
//   });
//
// });
//
// }
}
