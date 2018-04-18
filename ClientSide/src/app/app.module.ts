import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { EventsPage} from '../pages/events/events';
import { MapPage } from '../pages/map/map';
import { MorePage } from '../pages/more/more';
import { MoreeventnotificationsPage } from './../pages/moreeventnotifications/moreeventnotifications';
import { MorelanguagePage } from './../pages/morelanguage/morelanguage';

import { TabsPage } from '../pages/tabs/tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    EventsPage,
    MapPage,
    MorePage,
    TabsPage,
    MoreeventnotificationsPage,
    MorelanguagePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    EventsPage,
    MapPage,
    MorePage,
    TabsPage,
    MoreeventnotificationsPage,
    MorelanguagePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
