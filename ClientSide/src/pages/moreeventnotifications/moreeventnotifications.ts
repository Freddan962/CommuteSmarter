import { SettingService } from './../../app/services/settingService';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HttpService } from './../../app/services/httpService';

@IonicPage()
@Component({
  selector: 'page-moreeventnotifications',
  templateUrl: 'moreeventnotifications.html',
})
export class MoreeventnotificationsPage {

  storage: any;
  notifications: any;
  notificationDistance: any;
  settings: any;
  states: any;

  constructor(
    public storageService: Storage,
    public settingService: SettingService,
    private http: HttpService
  ) {
    this.storage = storageService;
    this.settings = settingService.getSettings('notifications');
    this.states = settingService.getStates();

    //Loads the slider's notification distance
    this.storage.get('notificationDistance').then((distance) => {
      if (distance == undefined)
        distance = 1;

      this.notificationDistance = distance;
    })

    //Prepare states locally for buttons
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
  onNotificationSettingValueChange(name, eventType, eventColor) {
    let state = this.states[name];
    this.updateNotificationState();
    console.log(name);
    this.settingService.setSetting(name, state);

    this.settingService.getCurrentPushId(pushId => {
      if(pushId !== undefined && pushId.length > 0) {
        console.log(pushId);

        let response = this.http.sendDataToServer(
          'push/user/category/',
          {
            userId: pushId,
            category: eventType + '_' + eventColor,
            status: state
          }
        );
        response.subscribe();
      } else {
          console.log("No PushId!");
      }
    });
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
    console.log(this.settings.states);
    let state = true;

    for (let property in this.settings.states) {
      if (this.settings.states.hasOwnProperty(property)) {
        if (!this.settings.states[property])
          state = false;
      }
    }

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
    for (let property in this.settings.states) {
      if (this.settings.states.hasOwnProperty(property)) {
        this.settings.states[property] = state;
      }
    }
  }

  public formatName(name: string) : string {
    return this.settingService.formatName(name);
  }

  getIconCategory(category, group){
    if(group == "Road Closed"){
      return './assets/imgs/' + category + '_red.png';
    }
    else if(group == "Limited passability"){
      return './assets/imgs/' + category + '_orange.png';
    }
    else if(group == "Emergency Vehicles"){
      return './assets/imgs/' + category + '_blue.png';
    }
  }
}
