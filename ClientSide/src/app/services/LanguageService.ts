import { Injectable } from '@angular/core';

@Injectable()
export class LanguageService {

  languages: any;

  constructor() { 
    this.languages = [
      {id: 'en', name: 'English'},
      {id: 'sv', name: 'Svenska'}
    ];
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
}