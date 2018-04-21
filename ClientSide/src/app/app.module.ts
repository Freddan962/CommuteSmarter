import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';

import { EventsPage} from '../pages/events/events';
import { MapPage } from '../pages/map/map';
import { MorePage } from '../pages/more/more';
import { MoreeventnotificationsPage } from './../pages/moreeventnotifications/moreeventnotifications';
import { MorelanguagePage } from './../pages/morelanguage/morelanguage';

import { TabsPage } from '../pages/tabs/tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { WelcomePage } from '../pages/welcome/welcome';
import { HttpModule } from '@angular/http';
import { LanguageService } from './services/LanguageService';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core/'
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';

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
    MoreeventnotificationsPage,
    MorelanguagePage,
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
    LanguageService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
