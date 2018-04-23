import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';

import { EventsPage} from '../pages/events/events';
import { EventsReportPage } from '../pages/eventsreport/eventsreport';
import { EventsreporttypemodalPage } from '../pages/eventsreporttypemodal/eventsreporttypemodal';


import { MapPage } from '../pages/map/map';
import { MorePage } from '../pages/more/more';
import { MoreeventnotificationsPage } from './../pages/moreeventnotifications/moreeventnotifications';
import { MorelanguagePage } from './../pages/morelanguage/morelanguage';

import { TabsPage } from '../pages/tabs/tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { WelcomePage } from '../pages/welcome/welcome';
import { HttpModule } from '@angular/http';
import { Camera } from '@ionic-native/camera';
import { LanguageService } from './services/LanguageService';


import { SocialSharing } from '@ionic-native/social-sharing';


@NgModule({
  declarations: [
    MyApp,
    EventsPage,
    MapPage,
    MorePage,
    TabsPage,
    EventsReportPage,
    EventsreporttypemodalPage,
    MoreeventnotificationsPage,
    MorelanguagePage,
    WelcomePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    EventsPage,
    EventsReportPage,
    EventsreporttypemodalPage,
    MapPage,
    MorePage,
    TabsPage,
    MoreeventnotificationsPage,
    MorelanguagePage,
    WelcomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SocialSharing,
    Camera,
    LanguageService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
