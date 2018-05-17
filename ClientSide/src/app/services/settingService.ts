import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class SettingService {  

  private settings: any;
  public static states: any = {};

  constructor(public storage: Storage) { 

    this.settings = {
      categories: [ ]
    };

    this.settings.categories.push({
      name: 'Road Closed',
      color: 'red',
      eventType: 'roadClosed',
      settings: [
        {
          name: 'Obstacle on the road',
          eventType: 'obstacle',
        },
        {
          name: 'Roadwork',
          eventType: 'roadWork',          
        },
        {
          name: 'Closed for event',
          eventType: 'closedForEvent',          
        },
        {
          name: 'Other (road closed)',
          eventType: 'otherClosed',          
        }
      ]
    });

    this.settings.categories.push({
      name: 'Limited passability',
      color: 'orange',
      eventType: 'limitedPassability',
      settings: [
        {
          name: 'Obstacle on the road',
          eventType: 'obstacle',          
        },
        {
          name: 'Roadwork',
          eventType: 'roadWork',          
        },
        {
          name: 'Traffic Jam',
          eventType: 'trafficJam',          
        },
        {
          name: 'Other (limited passability)',
          eventType: 'otherPassability',          
        },
      ]
    });

    this.settings.categories.push({
      name: 'Emergency Vehicles',
      color: 'blue',
      eventType: 'emergencyVehicles',
      settings: [
        {
          name: 'Emergency Vehicle Passing',
          eventType: 'emergencyVehicle',           
        },
        {
          name: 'Police Control',
          eventType: 'policeControl',           
        },
        {
          name: 'Other (emergency vehicles)',
          eventType: 'otherEmergency',          
        }
      ]
    });
  }

  /**
   * prepareModels()
   * 
   * Prepares the models for a specific pae (e.g filter) by generating appropriate
   * ngModels and holders for the setting states.
   * 
   * @param {string} page
   * @returns 
   * @memberof SettingService
   */
  private prepareModels(page: string) {
    page = this.formatName(page);
    
    this.settings.categories.forEach(category => {
      category.settings.forEach(setting => {
          
        let formattedName = this.formatName(page + category.name + setting.eventType)
        SettingService.states[formattedName] = true;
      });
    });
  }

  getSettings(page: string) : JSON {
    this.prepareModels(page);
    this.loadExistingData(page);
    return this.settings;
  }

  /**
   * loadExistingData(settings)
   * 
   * Loads existing locally stored states for the provided settings object
   * 
   * @param {any} settings 
   * @memberof SettingService
   */
  loadExistingData(page: string) : void {
    this.settings.categories.forEach(category => {
      category.settings.forEach(setting => {
        let formattedName = this.formatName(page + category.name + setting.eventType);
        SettingService.states[formattedName] = false;
      })
    });

    this.settings.categories.forEach(category => {
      category.settings.forEach(setting => {
        let formattedName = this.formatName(page + category.name + setting.eventType);

        this.storage.get(formattedName).then((state) => {
          if (state == undefined) return;
          SettingService.states[formattedName] = state;
        });
      });
    });
  }

  /**
   * formatName()
   * 
   * Formats the provided name
   * 
   * @private
   * @param {string} name E.g Filter Map
   * @returns {string} filtermap
   * @memberof SettingService
   */
  public formatName(name: string) : string {
    return name.replace(/\s+/g, '').toLowerCase();
  }

  /**
   * getEnabledSettings()
   * 
   * Returns all the enabled settings in a array for a page.
   * 
   * @public
   * @param {string} page E.g 'filter'
   * @returns {string[]} ['otherclosed', 'roadWork', 'trafficJam']
   * @memberof SettingService
   */
  public getEnabledSettings(page: string) : string[] {
    let enabledSettings = [];

    for (let key in SettingService.states) {
      if (key.indexOf(page) != 0) continue;

      if (this.isEnabled(page, key))
        enabledSettings.push(key);
    }

    return enabledSettings;
  }

  /**
   * isEnabled()
   * 
   * Returns whether or not a setting for a page is enabled
   * 
   * @param {string} page The page, e.g 'filter'
   * @param {string} setting The setting e.g 'trafficJam'
   * @returns {boolean} 
   * @memberof SettingService
   */
  public isEnabled(page: string, setting: string, category: string = '') : boolean {
    let formattedName = this.formatName(page + category + setting);
    
    if (SettingService.states[formattedName] == undefined)
      return false;

    return SettingService.states[formattedName];
  }

  public setSetting(setting: string, value: any = false) : void {
    setting = this.formatName(setting);
    this.storage.set(setting, value);
  }

  public setSettingFormat(page: string, setting: string, category: string = '', value: any = false) : void {
    let formattedName = this.formatName(page + category + setting);
    this.setSetting(formattedName, value);
  }

  public getStates() { return SettingService.states; }
}