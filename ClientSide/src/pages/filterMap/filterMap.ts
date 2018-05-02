import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-filterMap',
  templateUrl: 'filterMap.html',
})

export class filterMap {

  // Target the dom element
  @ViewChild('map') mapElement: ElementRef;
  storage: any;
  criticalWarningSettings: any;
  filterSettingsBeCautious : any;
  filterSettingsOther: any;
  filterSettingsAll: any;
  filterState: any;

  
  filters: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storageService: Storage) {
    this.storage = storageService;

    this.filterState = {
      ObstacleBlockingTheRoad: true,
      closedForEvent: true,
      obstacleOnTheRoad: true,
      trafficJam: true,
      RoadWork: true,
      EmergencyVehiclis:true
    }


    this.criticalWarningSettings = [
      {
        name: 'Obstacle blocking the road', 
        storageName: 'obstacleBlockingTheRoad',
        ngModel: this.filterState.obstacleBlockingTheRoad, 
        color: 'red'
      },
      {
        name: 'Closed for event', 
        storageName: 'closedForEvent',
        ngModel: this.filterState.closedForEvent, 
        color: 'red'
      },
    ];

    this.filterSettingsBeCautious = [
     
      {
        name: 'Obstacle on the road',
        storageName: 'obstacleOnTheRoad',
        ngModel: this.filterState.obstacleOnTheRoad,
        color: 'orange'
      },
      {
        name: 'Traffic Jam', 
        storageName: 'trafficjam',
        ngModel: this.filterState.trafficJam, 
        color: 'orange'
      },
      {
        name: 'Road Work', 
        storageName: 'RoadWork',
        ngModel: this.filterState.RoadWork, 
        color: 'orange'
      }
    ];

    this.filterSettingsOther = [
     
      {
        name: 'Emergency vehiclis',
        storageName: 'EmergencyVehiclis',
        ngModel: this.filterState.EmergencyVehiclis,
        color: 'blue'
      },
      
    ];


    this.loadFilterStatesCritical();
    this.loadFilterStatesCautious();
    this.loadFilterStatesOther();
    this.updateFilterStateCritical();
    this.updateFilterStateCautious();
    this.updateFilterStateOther();
  }

  onFilterSettingValueChange(name, state) {
    this.updateFilterStateCritical();
    this.updateFilterStateCautious();
    this.updateFilterStateOther();
    this.storage.set(name, state);
  }

  
  loadFilterStatesCritical() {
    this.criticalWarningSettings.forEach(setting => {
      this.storage.get(setting.storageName).then((state) => {
        if (state == undefined)
          return;
        if (!state)
          this.filters = false;
        setting.ngModel = state;
      });
    });
  }
  loadFilterStatesCautious() {
    this.filterSettingsBeCautious.forEach(setting => {
      this.storage.get(setting.storageName).then((state) => {
        if (state == undefined)
          return;
        if (!state)
          this.filters = false;
        setting.ngModel = state;
      });
    });
  }
  loadFilterStatesOther() {
    this.filterSettingsOther.forEach(setting => {
      this.storage.get(setting.storageName).then((state) => {
        if (state == undefined)
          return;
        if (!state)
          this.filters = false;
        setting.ngModel = state;
      });
    });
  }
  updateFilterStateCritical() {
    let state = true;
    this.criticalWarningSettings.forEach(setting => {
      if (!setting.ngModel) {
        state = false;
      }
    });
    this.filters = state;
  }
  updateFilterStateCautious() {
    let state = true;
    this.filterSettingsBeCautious.forEach(setting => {
      if (!setting.ngModel) {
        state = false;
      }
    });
    this.filters = state;
  }
  updateFilterStateOther() {
    let state = true;
    this.filterSettingsOther.forEach(setting => {
      if (!setting.ngModel) {
        state = false;
      }
    });
    this.filters = state;
  }


 
  
}
