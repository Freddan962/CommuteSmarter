import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class SettingService {  

  private settings: any;
  private storage: any;

  constructor(public storageService: Storage) { 
    this.storage = storageService;

    this.settings = {
      states: { },
      categories: [ ]
    };

    this.settings.categories.push({
      name: 'Road Closed',
      color: 'red',
      settings: [
        {
          name: 'Obstacle on the road',
          storageName: 'obstacleOnTheRoad',
        },
        {
          name: 'Roadwork',
          storageName: 'roadWork',
        },
        {
          name: 'Closed for event',
          storageName: 'closedForEvent',
        },
        {
          name: 'Other (road closed)',
          storageName: 'otherRoadClosed'
        }
      ]
    });

    this.settings.categories.push({
      name: 'Limited passability',
      color: 'orange',
      settings: [
        {
          name: 'Obstacle on the road',
          storageName: 'obstacleOnTheRoad',
        },
        {
          name: 'Roadwork',
          storageName: 'roadWork',
        },
        {
          name: 'Traffic Jam',
          storageName: 'Traffic Jam',
        },
        {
          name: 'Other (limited passability)',
          storageName: 'limitedPassability',
        },
      ]
    });

    this.settings.categories.push({
      name: 'Emergency Vehicles',
      color: 'blue',
      settings: [
        {
          name: 'Emergency Vehicle Passing', 
          storageName: 'emergencyVehiclePassing',
        },
        {
          name: 'Police Control', 
          storageName: 'policeControl',
        },
        {
          name: 'Other (emergency vehicles)',
          storageName: 'emergencyVehiclePassing',
        }
      ]
    });
  }

  /**
   * prepareModels()
   * 
   * Prepares the models for a specific setting (e.g filter) by generating appropriate
   * ngModels and holders for the setting states.
   * 
   * @param {any} settings 
   * @param {any} name 
   * @returns 
   * @memberof SettingService
   */
  private prepareModels(settings, name) {
    settings.categories.forEach(category => {
      category.formattedName = (category.name).replace(/\s+/g, '').toLowerCase();
      category.settings.forEach(setting => {
        setting.formattedName = (setting.name + name).replace(/\s+/g, '').toLowerCase() + category.formattedName;
        settings.states[setting.formattedName] = true;
        setting.storageName = (setting.storageName + name).replace(/\s+/g, '').toLowerCase();        
      });
    });

    return settings;
  }

  /**
   * getSettings()
   * 
   * Creates a deep data-copy of the defined settings to be used in a specific
   * setting environment.
   * 
   * @param {any} name 
   * @returns 
   * @memberof SettingService
   */
  getSettings(name) {
    let settingCopy = JSON.parse(JSON.stringify(this.settings));
    return this.prepareModels(settingCopy, name);
  }

  loadExistingData(settings) {
    settings.categories.forEach(category => {
      category.settings.forEach(setting => {

        this.storage.get(setting.storageName).then((state) => {
          if (state == undefined) return;
          settings.states[setting.formattedName] = state;
        });

      });
    });
  }
}