import { EventService } from './../../app/services/eventService';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventsPage } from './events';

@NgModule({
  declarations: [
    EventsPage,
  ],
  imports: [
    IonicPageModule.forChild(EventsPage),
  ],
  providers: [
    EventService
  ]
})
export class EventsPageModule {}
