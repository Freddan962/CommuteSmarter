import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
    this.features = [
      {name: 'Map Overview', icon: 'globe', description: 'Scroll and press current events to get a more in-depth description.'},
      {name: 'Events List', icon: 'information-circle', description: 'Detailed list of all events within your range. Report an ongoing event.'},
      {name: 'More', icon: 'ios-more', description: 'Adjust your notification preferences and register to unlock reporting feature.'}
    ]
  }

  ngAfterViewInit() {
    this.slides.lockSwipeToNext(true);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

}
