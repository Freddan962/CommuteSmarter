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
      translateName: 'roadClosed',
      settings: [
        {
          name: 'Obstacle on the road',
          translateName: '',
        },
        {
          name: 'Roadwork',
          translateName: '',          
        },
        {
          name: 'Closed for event',
          translateName: '',          
        },
        {
          name: 'Other (road closed)',
          translateName: '',          
        }
      ]
    });

    this.settings.categories.push({
      name: 'Limited passability',
      color: 'orange',
      translateName: 'limitedPassability',
      settings: [
        {
          name: 'Obstacle on the road',
          translateName: '',          
        },
        {
          name: 'Roadwork',
          translateName: '',          
        },
        {
          name: 'Traffic Jam',
          translateName: '',          
        },
        {
          name: 'Other (limited passability)',
          translateName: '',          
        },
      ]
    });

    this.settings.categories.push({
      name: 'Emergency Vehicles',
      color: 'blue',
      translateName: 'emergencyVehicles',
      settings: [
        {
          name: 'Emergency Vehicle Passing',
          translateName: '',           
        },
        {
          name: 'Police Control',
          translateName: '',           
        },
        {
          name: 'Other (emergency vehicles)',
          translateName: '',          
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

  /**
   * loadExistingData(settings)
   * 
   * Loads existing locally stored states for the provided settings object
   * 
   * @param {any} settings 
   * @memberof SettingService
   */
  loadExistingData(settings) {
    settings.categories.forEach(category => {
      category.settings.forEach(setting => {
        this.storage.get(setting.formattedName).then((state) => {
          if (state == undefined) return;
          settings.states[setting.formattedName] = state;
        });
      });
    });
  }
}