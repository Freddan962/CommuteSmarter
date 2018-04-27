import { EventService } from './services/eventService';
import { HttpService } from './services/httpService';
import { LoginWithTwitterService } from './services/loginWithTwitterService';
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
import { filterMap } from './../pages/filterMap/filterMap';


import { TabsPage } from '../pages/tabs/tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { WelcomePage } from '../pages/welcome/welcome';
import { HttpModule } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from '@ionic-native/camera';
import { LanguageService } from './services/LanguageService';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core/'
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HTTP } from '@ionic-native/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { SocialSharing } from '@ionic-native/social-sharing';
import { TwitterConnect } from '@ionic-native/twitter-connect';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/translations/", ".json");
}

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
    filterMap,
    WelcomePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
      }
    })
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
    filterMap,
    WelcomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    EventService,
    HttpService,
    LoginWithTwitterService,
    SocialSharing,
    TwitterConnect,
    Camera,
    LanguageService,
    HTTP,
	Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
