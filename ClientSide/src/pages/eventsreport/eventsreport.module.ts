import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventsReportPage } from './eventsreport';
import { Camera } from '@ionic-native/camera';


@NgModule({
  declarations: [
    EventsReportPage,
  ],
  imports: [
    IonicPageModule.forChild(EventsReportPage),
  ],
  providers:[
    Camera
  ]
  
})
export class EventsReportPageModule {}
