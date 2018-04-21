import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { TabsPage } from '../pages/tabs/tabs';
import { MapPage } from '../pages/map/map';
import { WelcomePage } from '../pages/welcome/welcome';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  storageService: Storage;
  rootPage:any = MapPage;
  alwaysShowWelcomePage: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public Storage: Storage) {
    this.storageService = Storage;
    this.alwaysShowWelcomePage = true;

    platform.ready().then(() => {
      this.handleWelcomeScreen();
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  handleWelcomeScreen() {
    if (this.alwaysShowWelcomePage)
      this.rootPage = WelcomePage;

    this.storageService.get('finalizedWelcome').then((state) => {
      if (!state) {
        this.rootPage = WelcomePage;
      }
    });
  }
}
