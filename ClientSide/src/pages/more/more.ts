import { Component } from '@angular/core';
import { LoginWithTwitterService } from './../../app/services/loginWithTwitterService';
import { MoreeventnotificationsPage } from '../moreeventnotifications/moreeventnotifications';
import { MorelanguagePage } from '../morelanguage/morelanguage';
import { NavController, ModalController, NavParams} from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-more',
  templateUrl: 'more.html'
})
export class MorePage {

  private signedIn: boolean;

  constructor(public toastCtrl: ToastController,
    public navCtrl: NavController,
    private loginWithTwitterService: LoginWithTwitterService,
    public translate: TranslateService)
  {}

  loginWithTwitter() {
    this.loginWithTwitterService.loginWithTwitter();
  }

  logOutTwitter() {
    this.loginWithTwitterService.logOutTwitter();
  }

  getIfSignedIn() {
    return this.loginWithTwitterService.getIfSignedIn();
  }

  userName() {
    console.log(this.loginWithTwitterService.getUserName());
    return this.loginWithTwitterService.getUserName();
  }

  //Open Notification page
  openNotificationModal() {
    this.navCtrl.push(MoreeventnotificationsPage);
  }

  //Open Language page
  openLanguageModal() {
    this.navCtrl.push(MorelanguagePage);
  }

  //ionic cordova plugin add https://github.com/chroa/twitter-connect-plugin --variable FABRIC_KEY=29ffbd50c9d16f409638495a50eec740d751fb3a --variable TWITTER_KEY=agC1meoWus9BLERR6pLKhbIk2 --variable TWITTER_SECRET=UWLv3b9hqZmm7fZXKoGZR0PWcstKYIwP0efJOoDp30umYjN3xs
}
