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
   ) {
    this.storageService = Storage;
    this.alwaysShowWelcomePage = false;

    platform.ready().then(() => {
      this.handleWelcomeScreen();
      statusBar.styleDefault();
      splashScreen.hide();

      const push = PushNotification.init({
        android: {
          senderID: 962564067117
        }
      });

      push.on('registration', (data) => {
        // data.registrationId
        // Send the id to server
      });

      push.on('notification', (data) => {
    	   // data.message,
    	   // data.title,
    	   // data.count,
    	   // data.sound,
         // data.image,
         // data.additionalData

         //ionic modal or something
       });

       push.on('error', (e) => {
    	    // e.message
       });
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
}
