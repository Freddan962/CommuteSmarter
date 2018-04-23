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

  notifications: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storageService: Storage) {
    this.storage = storageService;

    this.notifications = true;
    this.notificationState = {
      roadWork: true,
      criticalObstacle: true,
      roadClosed: true,
      obstacle: true,
      trafficJam: true
    }

    this.notificationSettings = [
      {
        name: 'Road Work', 
        storageName: 'roadWork',
        ngModel: this.notificationState.roadWork, 
        color: 'red'
      },
      {
        name: 'Critical Obstacle', 
        storageName: 'criticalObstacle',
        ngModel: this.notificationState.criticalObstacle, 
        color: 'red'
      },
	    {
        name: 'Road Closed', 
        storageName: 'roadClosed',
        ngModel: this.notificationState.roadClosed,
        color: 'red'
      },
      {
        name: 'Obstacle',
        storageName: 'obstacle',
        ngModel: this.notificationState.obstacle,
        color: 'orange'
      },
      {
        name: 'Traffic Jam', 
        storageName: 'trafficJam',
        ngModel: this.notificationState.trafficJam, 
        color: 'orange'
      }
    ];

    this.storage.get('notificationDistance').then((distance) => {
      if (distance == undefined)
        distance = 1;

      this.notificationDistance = distance;
    })

    this.loadNotificationStates();
  }

  notificationSettingValueChanged(name, state) {
    this.updateNotificationState();
    this.storage.set(name, state);
  }

  onNotificationDistanceChange() {
    this.storage.set('notificationDistance', this.notificationDistance);
  }

  loadNotificationStates() {
    this.notificationSettings.forEach(setting => {
      this.storage.get(setting.storageName).then((state) => {
        if (state == undefined)
          return;
        
        if (!state)
          this.notifications = false;

        setting.ngModel = state;
      });
    });
  }

  updateNotificationState() {
    let state = true;
    this.notificationSettings.forEach(setting => {
      if (!setting.ngModel) {
        state = false;
      }
    });

    this.notifications = state;
  }
}
