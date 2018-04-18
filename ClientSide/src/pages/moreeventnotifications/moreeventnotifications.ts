import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MoreeventnotificationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-moreeventnotifications',
  templateUrl: 'moreeventnotifications.html',
})
export class MoreeventnotificationsPage {

  notificationSettings: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
    this.notificationSettings = [
      {name: 'Road Work', ngModel: 'roadWorks', color: 'red'},
      {name: 'Critical Obstacle', ngModel: 'criticalObstacle', color: 'red'},
      {name: 'Obstacle', ngModel: 'obstacle', color: 'orange'},
      {name: 'Road Closed', ngModel: 'roadClosed', color: 'red'},
      {name: 'Traffic Jam', ngModel: 'trafficJam', color: 'orange'}
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MoreeventnotificationsPage');
  }
}
