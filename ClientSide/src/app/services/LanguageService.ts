import { Injectable } from '@angular/core';

@Injectable()
export class LanguageService {

  languages: any;

  constructor() { 
    this.languages = [
      {name: 'Svenska'},
      {name: 'English'}
    ];
  }

  getLanguages() {
    return this.languages;
  }
}