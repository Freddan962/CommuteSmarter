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

  constructor(public navCtrl: NavController, public navParams: NavParams, public storageService: Storage, public settingService: SettingService) {
    this.settings = settingService.getSettings('filter');
    this.states = settingService.getStates();
  }

  onFilterSettingValueChange(storageName) { 
    let state = this.states[storageName];
    this.settingService.setSetting(storageName, state);
  }  

  formatName(name: string) {
    return this.settingService.formatName(name);
  } 
}
