import { SettingService } from './services/settingService';
import { LanguageService } from './services/LanguageService';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import {TranslateService} from '@ngx-translate/core';
import { TabsPage } from '../pages/tabs/tabs';
import { MapPage } from '../pages/map/map';
import { WelcomePage } from '../pages/welcome/welcome';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { AlertController } from 'ionic-angular';
import { HttpService } from './services/httpService';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  storageService: Storage;
  rootPage:any = TabsPage;
  alwaysShowWelcomePage: any;

  constructor(platform: Platform,
    statusBar: StatusBar, splashScreen: SplashScreen,
    public Storage: Storage,
    translate: TranslateService,
    language: LanguageService,
    private alertCtrl: AlertController,
    private http: HttpService,
    private push: Push
   ) {
    this.storageService = Storage;
    this.alwaysShowWelcomePage = false;

    platform.ready().then(() => {
      this.handleWelcomeScreen();
      statusBar.styleDefault();
      splashScreen.hide();
      this.handlePushNotifications();
    });
  }

  handleWelcomeScreen() {
    if (this.alwaysShowWelcomePage){
      this.rootPage = WelcomePage;
    }

    this.storageService.get('finalizedWelcome').then((state) => {
      if (!state) {
        this.rootPage = WelcomePage;
      }
    });
  }

  handlePushNotifications() {
    this.push.hasPermission()
    .then((res: any) => {

      if (res.isEnabled) {
        console.log('We have permission to send push notifications');
      } else {
        console.log('We do not have permission to send push notifications');
      }

    }).catch(error=> {
      console.log("-----");
      console.log(error);
      console.log("-----");
    });

    const options: PushOptions = {
      android: {
        senderID: '962564067117'
      }
    };

    const pushObject: PushObject = this.push.init(options);
    console.log("RUN PUSH");

    pushObject.on('registration').subscribe( data => {
      let response = this.http.sendDataToServer('push/user', { userId: data.registrationId });
      response.subscribe(data => {

        console.log("response:");
        console.log(data);
      });
      
      console.log('pushid:');
      console.log(data);
    });

    pushObject.on('notification').subscribe(data => {
       console.log(data);

       let alert = this.alertCtrl.create({
         title: data.title,
         message: data.message
       });

       alert.present();
     });

     pushObject.on('error').subscribe(error => {
        console.log(error);
     });
  }
}
