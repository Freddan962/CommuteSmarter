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

  languages: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
    this.languages = [
	  {name: 'English'},
      {name: 'Svenska'}
     
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MorelanguagePage');
  }

}
