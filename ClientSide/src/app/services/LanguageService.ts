import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

@Injectable()
export class LanguageService {
  languages: any;
  storage: Storage;

  selectedLanguageID: any;
  
  constructor(public storageService: Storage, public translate: TranslateService) { 
    this.storage = storageService;

    this.languages = [
      {id: 'en', name: 'English'},
      {id: 'sv', name: 'Svenska'}
    ];

    translate.addLangs(this.getLanguageIDs());    
    translate.setDefaultLang(this.getLanguageIDs[0]);
    
    this.storage.get("language").then((id) => {
      if (translate.currentLang == id)
        return;

      this.selectedLanguageID = id;
      translate.use(this.getSelectedLanguageID());
    });
  }

  getLanguages() {
    return this.languages;
  }

  getLanguageIDs() {
    let ids = [];
    this.languages.forEach(language => {
      ids.push(language.id);
    });
    return ids;
  }

  getSelectedLanguageID() {
    return this.selectedLanguageID;
  }

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
  }
}