import { SettingService } from './../../app/services/settingService';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-filterMap',
  templateUrl: 'filterMap.html',
})

export class filterMap {
  settings: any;
  states: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storageService: Storage,
    public settingService: SettingService
  ){
    this.settings = settingService.getSettings('filter');
    this.states = settingService.getStates();
  }

  onFilterSettingValueChange(storageName, eventType, eventColor) {
    let state = this.states[storageName];
    console.log(storageName);
    console.log(state);
    console.log(eventType);
    console.log(eventColor);

    // first store to db for ui usage
    this.settingService.setSetting(storageName, state);

    // then store to db in correct format for direct usage in api
    if(state) {
      this.settingService.setCurrentFilters(eventType, eventColor);
    } else {
      this.settingService.removeFilter(eventType, eventColor);
    }
  }

  formatName(name: string) {
    return this.settingService.formatName(name);
  }
}
