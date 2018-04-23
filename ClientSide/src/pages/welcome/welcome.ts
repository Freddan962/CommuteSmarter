import { TranslateModule } from '@ngx-translate/core/';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { LanguageService } from './../../app/services/LanguageService';
import { Storage } from '@ionic/storage';
import { MapPage } from './../map/map';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {
  @ViewChild(Slides) slides : Slides;
  languageService: LanguageService;
  storageService: Storage;
  navController: NavController;
  translate: TranslateService;

  features: any;
  languages: any[];
  selectedLanguage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public LanguageService: LanguageService, public StorageService: Storage, public translateService: TranslateService) {
    this.navController = navCtrl;
    this.languageService = LanguageService;
    this.storageService = StorageService;
    this.translate = translateService;

    this.features = [
      {name: 'Map', icon: 'globe', description: 'Scroll and press current events to get a more in-depth description.'},
      {name: 'List', icon: 'information-circle', description: 'Detailed list of all events within your range. Report an ongoing event.'},
      {name: 'More', icon: 'ios-more', description: 'Adjust your notification preferences and register to unlock reporting feature.'}
    ]
  }

  ngOnInit() {
    this.languages = this.languageService.getLanguages();    
  }

  ngAfterViewInit() {
    this.slides.lockSwipeToNext(true);
    this.slides.paginationClickable = false;
  }

  goToNextPage() {
    this.storageService.set('finalizedWelcome', true);
    this.navController.push(MapPage);
  }

  onNextClick() {
    if (this.selectedLanguage == null)
      return;

    this.slides.lockSwipeToNext(false);
    this.slides.slideNext();
    this.slides.lockSwipeToNext(true);
    this.slides.paginationClickable = false;
  }

  onLanguageSelect(language) {
    this.selectedLanguage = language;
    console.log("Using language " + language);
    this.translate.use(language);
  }
}
