import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventsReportPage } from '../eventsreport/eventsreport';

/**
 * Generated class for the EventsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {
  items: any[];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.items = [];
    for(let i = 0; i < 20 ; i++){
      this.items.push({
        text: 'item' + i,
        id: i,
        accordionOpen: false
      });
    }

    console.log(this.items);
  }


  itemSelected(item){
    console.log(item);
    item.accordionOpen = !item.accordionOpen;
  }



  // Use this code to link events-page with events-report page
  openReportPage() {
    this.navCtrl.push(EventsReportPage);
  }


}
