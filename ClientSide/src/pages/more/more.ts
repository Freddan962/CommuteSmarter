import { Component } from '@angular/core';
import { NavController, ModalController, NavParams} from 'ionic-angular';

import { MoreeventnotificationsPage } from '../moreeventnotifications/moreeventnotifications';
import { MorelanguagePage } from '../morelanguage/morelanguage';

@Component({
  selector: 'page-more',
  templateUrl: 'more.html'
})
export class MorePage {


  constructor(public navCtrl: NavController) {
    const signedIn = false;
  }


//For future register/profile/login-UI
  // if(signedIn){
  // }

//   checkLoginState() {
//   FB.getLoginStatus(function (response) {
//     statusChangeCallback(response);
//   });
// }

//Open Notification page
  openNotificationModal() {
    this.navCtrl.push(MoreeventnotificationsPage);
  }

  //Open Language page
  openLanguageModal() {
    this.navCtrl.push(MorelanguagePage);
  }




}
