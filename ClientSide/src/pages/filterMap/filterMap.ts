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
  storage: any;
  settings: any;  

  constructor(public navCtrl: NavController, public navParams: NavParams, public storageService: Storage, public settingService: SettingService) {
    this.storage = storageService;
    this.settings = settingService.getSettings('filter');

    settingService.loadExistingData(this.settings);
  }

  onFilterSettingValueChange(storageName, state) {  
    this.storage.set(storageName, state);
  }  
}
