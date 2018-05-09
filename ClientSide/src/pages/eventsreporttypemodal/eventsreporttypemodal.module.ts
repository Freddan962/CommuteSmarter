import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventsreporttypemodalPage } from './eventsreporttypemodal';
import { EventsReportService } from './../../app/services/eventsreportService';



@NgModule({
  declarations: [
    // EventsreporttypemodalPage,
  ],
  imports: [
    IonicPageModule.forChild(EventsreporttypemodalPage),
  ],
  providers: [
    EventsReportService,
  ]
})
export class EventsreporttypemodalPageModule {}
