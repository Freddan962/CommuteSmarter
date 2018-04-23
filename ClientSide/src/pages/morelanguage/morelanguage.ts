import { LanguageService } from './../../app/services/LanguageService';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MorelanguagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-morelanguage',
  templateUrl: 'morelanguage.html',
})
export class MorelanguagePage {
  language: LanguageService;
  languages: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public LanguageService: LanguageService) {
    this.languages = LanguageService.getLanguages();
    this.language = LanguageService;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MorelanguagePage');
  }

  onLanguageSelect(id) {
    this.language.setLanguage(id);
  }
}
