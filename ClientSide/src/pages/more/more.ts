import { Component } from '@angular/core';
import { NavController, ModalController, NavParams} from 'ionic-angular';

import { MoreeventnotificationsPage } from '../moreeventnotifications/moreeventnotifications';
import { MorelanguagePage } from '../morelanguage/morelanguage';

@Component({
  selector: 'page-more',
  templateUrl: 'more.html'
})
export class MorePage {


  constructor(public navCtrl: NavController,) {

    const signedIn = false;

  }



  if(signedIn){

  }

  openNotificationModal() {
    this.navCtrl.push(MoreeventnotificationsPage);
  }

  openLanguageModal() {
    this.navCtrl.push(MorelanguagePage);
    // myModal.present();
  }


//   checkLoginState() {
//   FB.getLoginStatus(function (response) {
//     statusChangeCallback(response);
//   });
// }

}
