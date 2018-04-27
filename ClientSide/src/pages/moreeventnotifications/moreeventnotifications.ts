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

    //Contains all the states for the different notification settings
    this.notificationState = {
      roadWork: true,
      criticalObstacle: true,
      roadClosed: true,
      obstacle: true,
      trafficJam: true
    }

    /** 
     * Represents data for all the different notification settings     
     * Name = The visual name.
     * storageName = The key to store the state in local memory. 
     * ngModel = The variable used for the notification setting's databinding.
     * color = The dot color, as defined in the app's main scss file.
    */
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

    //Loads the slider's notification distance
    this.storage.get('notificationDistance').then((distance) => {
      if (distance == undefined)
        distance = 1;

      this.notificationDistance = distance;
    })

    //Prepare states locally for buttons
    this.loadNotificationStates();
    this.updateNotificationState();
  }

  /**
   * onNotificationSettingValueChange()
   * 
   * Function gets called when one of the notification settin's value changes.
   * 
   * @param {any} name The storageName of the setting.
   * @param {any} state The new state for the setting.
   * @memberof MoreeventnotificationsPage
   */
  onNotificationSettingValueChange(name, state) {
    this.updateNotificationState();
    this.storage.set(name, state);
  }

  /**
   * onNotificationDistanceChange()
   * 
   * Function gets called when the distance slider's value changes.
   * Stores the new value locally. 
   * 
   * @memberof MoreeventnotificationsPage
   */
  onNotificationDistanceChange() {
    this.storage.set('notificationDistance', this.notificationDistance);
  }

  /**
   * onNotificationChange()
   *   
   * Function gets called when notification's view bound value is changed.
   * Enables/disables all subsettings depending on new state.
   * 
   * @memberof MoreeventnotificationsPage
   */
  onNotificationChange() {
    this.notifications ? this.setNotificationStates(true) : this.setNotificationStates(false);
  }

  /**
   * loadNotificationStates()
   * 
   * Loads the local stored state for the different notification settings
   * and assigns correct state values in memory.
   *  
   * @memberof MoreeventnotificationsPage
   */
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

  /**
   * updateNotificationState()
   * 
   * Updates main notification toggler state 
   * based on all the notification settings' states.
   * 
   * E.g if all other settings are active, a call to this function will 
   * result in activation and if not it will become inactive.
   * 
   * @memberof MoreeventnotificationsPage
   */
  updateNotificationState() {
    let state = true;
    this.notificationSettings.forEach(setting => {
      if (!setting.ngModel) {
        state = false;
      }
    });

    this.notifications = state;
  }

  /**
   * setNotificationStates()
   * 
   * Sets the notification state for all notification settings.
   * 
   * @param {any} state The state to set the notification to. 
   *                    True for active, false for inactive.
   * @memberof MoreeventnotificationsPage
   */
  setNotificationStates(state) {
    this.notificationSettings.forEach(setting => {
      setting.ngModel = state;
    });
  }
}
