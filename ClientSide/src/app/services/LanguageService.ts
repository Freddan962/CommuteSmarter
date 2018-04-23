import { Injectable } from '@angular/core';

@Injectable()
export class LanguageService {

  languages: any;

  constructor() { 
    this.languages = [
      {id: 'sv', name: 'Svenska'},
      {id: 'en', name: 'English'}
    ];
  }

  getLanguages() {
    return this.languages;
  }
}