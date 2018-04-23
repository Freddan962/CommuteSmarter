import { Storage } from '@ionic/storage';
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

  storage: any;

  notificationSettings: any;
  notificationDistance: any;
  notificationState: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storageService: Storage) {
    this.storage = storageService;
    this.notificationDistance = 1;

    this.notificationState = {
      roadWorks: true,
      criticalObstacle: true,
      roadClosed: true,
      obstacle: true,
      trafficJam: true
    }

    this.notificationSettings = [
      {
        name: 'Road Work', 
        ngModel: this.notificationState.roadWorks, 
        color: 'red'
      },
      {
        name: 'Critical Obstacle', 
        ngModel: this.notificationState.criticalObstacle, 
        color: 'red'
      },
	    {
        name: 'Road Closed', 
        ngModel: this.notificationState.roadClosed,
        color: 'red'
      },
      {
        name: 'Obstacle',
        ngModel: this.notificationState.obstacle,
        color: 'orange'
      },
      {
        name: 'Traffic Jam', 
        ngModel: this.notificationState.trafficJam, 
        color: 'orange'
      }
    ];

    this.loadNotificationStates();
  }

  notificationSettingValueChanged(name, state) {
    this.storage.set(name, state);
  }

  onNotificationDistanceChange() {
    console.log("Distance changed to: " + this.notificationDistance);
  }

  loadNotificationStates() {
    this.notificationSettings.forEach(setting => {
      this.storage.get(setting.name).then((state) => {
        if (state == undefined)
          return;

        setting.ngModel = state;
      });
    });
  }
}
