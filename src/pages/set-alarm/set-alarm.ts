import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Geofence, SMS} from 'ionic-native';
import { Vibration } from '@ionic-native/vibration';
import { ActivePage } from '../active/active';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
// import { LocationTracker } from '../../providers/location-tracker/location-tracker';
import { BackgroundGeolocation, BackgroundGeolocationConfig } from '@ionic-native/background-geolocation';




/**
 * Generated class for the SetAlarmPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

 @Component({
   selector: 'page-set-alarm',
   templateUrl: 'set-alarm.html',
 })
 export class SetAlarmPage {
   radius: number = 100;
   error: any;
   success:any;
   destination: any;
   miles: any;
   coord1: any;


   constructor(private backgroundGeolocation: BackgroundGeolocation, private vibration: Vibration, private alertCtrl: AlertController, public alerCtrl: AlertController,
     public navCtrl: NavController, public navParams: NavParams, private platform: Platform, private geolocation: Geolocation,
     private nativeGeocoder: NativeGeocoder) {
     this.destination = navParams.get('destination')
    this.miles = "One Mile"

console.log(this.destination)


     this.platform.ready().then(() => {

      Geofence.initialize().then(
        () => console.log('Geofence Plugin Ready'),
        (err) => console.log(err)
      );

    });
  }

reverseLocation(){

  this.nativeGeocoder.forwardGeocode(this.destination)
    .then((coordinates: NativeGeocoderForwardResult) => this.setGeofence(this.radius, coordinates))
    .catch((error: any) => console.log(error));




}


  setGeofence(value: number, coordinates) {
    console.log("hi")
    let location = coordinates
    console.log(location.longitude)



    // this.reverseLocation();
    this.geolocation.getCurrentPosition({
      enableHighAccuracy: true
    }).then((resp) => {
      var longitude= location.longitude;
      var latitude = location.latitude;
      var radius = value;


      let fence = {
          id: "myGeofenceID1",
          latitude:       latitude,
          longitude:      longitude,
          radius:         radius,
          transitionType: 1,
          notification: { //notification settings
       id:             1, //any unique ID
       title:          'ALERT', //notification title
       text:           '!!YOU ARE IN NEAR PROXIMITY OF YOUR STOP!!', //notification body
       openAppOnClick: true ,
       vibration:      [1000, 5000, 2000]
   }
        }

        Geofence.addOrUpdate(fence).then(
          () => this.success = true,
          (err) => this.error = "Failed to add or update the fence."
        );

    //     Geofence.onTransitionReceived().subscribe(resp => {
    //       this.vibration.vibrate(3000)
    //    SMS.send('3239897826', 'Your stop is in close proximity!!!');
    //  });



    }).catch((error) => {
      this.error = error;
    });


     this.destination = this.navParams.get('destination')
     this.miles = "One Mile"

   }
   doAlert() {
  let alert = this.alerCtrl.create({
    title: 'New Friend!',
    message: 'Your friend, Obi wan Kenobi, just approved your friend request!',
    buttons: ['Ok']
  });
  alert.present()
}

  //  start(){
  //   this.locationTracker.startTracking();
  // }
  //
  // stop(){
  //   this.locationTracker.stopTracking();
  // }






   showConfirm() {
     let confirm = this.alertCtrl.create({
       title: 'You have set your alarm!',
       message: '',
       buttons: [
         {

           text: 'Close',
           handler: () => {
             console.log('Agree clicked');
           }
         }
       ]
     });
     confirm.present();
   }



   ionViewDidLoad() {
     console.log('ionViewDidLoad SetAlarmPage');
   }

 }
