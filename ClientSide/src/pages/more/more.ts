import { Component } from '@angular/core';
import { NavController, ModalController, NavParams} from 'ionic-angular';

import { ToastController } from 'ionic-angular';
import { TwitterConnect } from '@ionic-native/twitter-connect';
import { MoreeventnotificationsPage } from '../moreeventnotifications/moreeventnotifications';
import { MorelanguagePage } from '../morelanguage/morelanguage';

@Component({
  selector: 'page-more',
  templateUrl: 'more.html'
})
export class MorePage {

  private signedIn: boolean;

  constructor(public toastCtrl: ToastController, public navCtrl: NavController,
    private twitter: TwitterConnect) {
    this.signedIn = false;
  }

  loginWithTwitter() {
    this.twitter.login().then(
      (result) => {
        console.log(response);
        this.signedIn = true;

        let toast = this.toastCtrl.create({
          message: "Signed you in with Twitter",
          position: 'top',
          cssClass: 'success',
          duration: 3000
        });
        toast.present();
      },
      (error) => {
        console.log(error);
        let toast = this.toastCtrl.create({
          message: error,
          position: 'top',
          cssClass: 'failure',
          duration: 3000
        });
        toast.present();
      }
    );
  }

  getIfSignedIn() {
    return this.signedIn;
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
