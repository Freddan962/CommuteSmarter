import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

@Injectable()
export class LanguageService {
  languages: any;
  storage: Storage;
  translate: TranslateService;

  selectedLanguageID: any;
  
  constructor(public storageService: Storage, public translateService: TranslateService) { 
    this.storage = storageService;
    this.translate = translateService;

    //Definition of languages LanguageService uses
    this.languages = [
      {id: 'en', name: 'English'},
      {id: 'sv', name: 'Svenska'}
    ];

    //Prepare default settings for translation pipe
    this.translate.addLangs(this.getLanguageIDs());    
    this.translate.setDefaultLang(this.getLanguageIDs[0]);
  
    //Promise based call to fetch locally stored language identifier
    this.storage.get("language").then((id) => {
      if (this.translate.currentLang == id)
        return;
      
        this.setLanguage(id);
    });
  }

  /**
   * getLanguages()
   * 
   * @returns LanguageService's language array 
   * @memberof LanguageService
  */
  getLanguages() {
    return this.languages;
  }

  /**
   * getLanguageIDs()
   * 
   * @returns All IDs from this LanguageService's language array
   * @memberof LanguageService
  */
  getLanguageIDs() {
    let ids = [];
    this.languages.forEach(language => {
      ids.push(language.id);
    });
    return ids;
  }

  /**
   * getSelectedLanguageID()
   * 
   * @returns The currently selected language identifier
   * @memberof LanguageService
  */
  getSelectedLanguageID() {
    return this.selectedLanguageID;
  }

  /**
   * setLanguage(id)
   * 
   * Sets the language based on the provided ID for the application 
   * and translation pipe.
   * 
   * @param {any} id The language to activate for the application  
   * @memberof LanguageService
   * @throws Will throw "Invalid language identifier" if a non-defined language ID is provided
  */
  setLanguage(id) {
    let found = false;
    this.languages.forEach(language => {
      if (language.id == id) 
        found = true;
    });

    if (!found)
      throw "Invalid language identifier";

    this.storage.set("language", id);
    this.selectedLanguageID = id;
    this.translate.use(this.getSelectedLanguageID());
  }
}