import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { LanguageService } from './../../app/services/LanguageService';

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
  features: any;
  languages: any;

  languageService: LanguageService;

  constructor(public navCtrl: NavController, public navParams: NavParams, public LanguageService: LanguageService) {
    this.languageService = LanguageService;

    this.features = [
      {name: 'Map Overview', icon: 'globe', description: 'Scroll and press current events to get a more in-depth description.'},
      {name: 'Events List', icon: 'information-circle', description: 'Detailed list of all events within your range. Report an ongoing event.'},
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

  onNextClick() {
    this.slides.lockSwipeToNext(false);
    this.slides.slideNext();
    this.slides.lockSwipeToNext(true);
  }
}
