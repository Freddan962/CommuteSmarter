import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


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
    for(let i = 0; i < 30 ; i++){
      this.items.push({
        text: 'item' + i,
        id: i,
        accordionOpen: false,
        color: 'red'
      });
    }

    console.log(this.items);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventsPage');
  }

  itemSelected(item){
    console.log(item);
    item.accordionOpen = !item.accordionOpen;
  }

  bntClick() {
 
  }
}
