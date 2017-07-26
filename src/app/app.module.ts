import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular'
import { Geolocation } from '@ionic-native/geolocation';
import { MyApp } from './app.component';



import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { SetAlarmPage } from '../pages/set-alarm/set-alarm';
import { ActivePage } from '../pages/active/active';

import { Vibration } from '@ionic-native/vibration';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BackgroundGeolocation, BackgroundGeolocationConfig } from '@ionic-native/background-geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    SetAlarmPage,
    ActivePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    SetAlarmPage,
    ActivePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Vibration,
    BackgroundGeolocation,
    Geolocation,
    NativeGeocoder,


    {provide: ErrorHandler, useClass: IonicErrorHandler}

  ]
})
export class AppModule {}
