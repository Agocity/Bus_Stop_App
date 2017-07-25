import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Geofence, SMS} from 'ionic-native';
import { Vibration } from '@ionic-native/vibration';
import { ActivePage } from '../active/active';
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

   constructor(private backgroundGeolocation: BackgroundGeolocation, private vibration: Vibration, private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, private platform: Platform, private geolocation: Geolocation) {

     this.platform.ready().then(() => {

      Geofence.initialize().then(
        () => console.log('Geofence Plugin Ready'),
        (err) => console.log(err)
      );

    });
  }

  setGeofence(value: number) {

    this.geolocation.getCurrentPosition({
      enableHighAccuracy: true
    }).then((resp) => {
      var longitude = -118.295311;
      var latitude = 34.017542
      var radius = value;

      let fence = {
          id: "myGeofenceID1",
          latitude:       latitude,
          longitude:      longitude,
          radius:         radius,
          transitionType: 1
        }

        Geofence.addOrUpdate(fence).then(
          () => this.success = true,
          (err) => this.error = "Failed to add or update the fence."
        );

        Geofence.onTransitionReceived().subscribe(resp => {
          this.vibration.vibrate(3000)
       SMS.send('3239897826', 'Your stop is in close proximity!!!');
     });

     this.navCtrl.push(ActivePage);


    }).catch((error) => {
      this.error = error;
    });


     this.destination = this.navParams.get('destination')
     this.miles = "One Mile"

   }

  //  start(){
  //   this.locationTracker.startTracking();
  // }
  //
  // stop(){
  //   this.locationTracker.stopTracking();
  // }


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
     else{
       console.log(lat2)
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
