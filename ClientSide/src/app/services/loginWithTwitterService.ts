import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { TwitterConnect } from '@ionic-native/twitter-connect';
import { ToastController } from 'ionic-angular';

@Injectable()
export class LoginWithTwitterService {

  private signedIn: boolean;
  private userName: string;
  private userId: string;
  private secret: string;
  private token: string;

  constructor(private twitter: TwitterConnect,
    private storage: Storage,
    private toastCtrl: ToastController) {

      this.storage.get('twittwerLoginStatus').then((signedIn) => {
        if(signedIn === undefined) {
          console.log('Did Not Find the Twitter login status in db');
          this.signedIn = false;
        } else {
          console.log('Found in db Twitter login status: ' + signedIn);
          this.signedIn = signedIn;
        }
      });

      this.storage.get('twittwerUser').then((twittwerUser) => {
        if(twittwerUser === undefined) {
          this.setUserDetailsNull();
        } else  {
          this.setAllUserDetails(twittwerUser);
        }
      });
  }

  loginWithTwitter() {
    this.twitter.login().then(
      (result) => {
        console.log(result);
        this.signedIn = true;
        this.storage.set('twittwerLoginStatus', true);

        this.storage.set('twittwerUser', result);
        this.setAllUserDetails(result);

        let successMessage = this.toastCtrl.create({
          message: 'Signed in '+ result.userName + ' with Twitter',
          position: 'top',
          cssClass: 'success',
          duration: 3000
        });

        successMessage.present();
      },
      (error) => {
        console.log(error);

        let errorMessage = this.toastCtrl.create({
          message: error,
          position: 'top',
          cssClass: 'failure',
          duration: 3000
        });

        errorMessage.present();
      }
    );
  }

  private setUserDetailsNull() {
    this.userName = null;
    this.userId = null;
    this.secret = null;
    this.token = null;
  }

  private setAllUserDetails(twittwerUser) {
    this.userName = twittwerUser.userName;
    this.userId = twittwerUser.userId;
    this.secret = twittwerUser.secret;
    this.token = twittwerUser.token;
  }

  logOutTwitter() {
    this.twitter.logout().then(
      (result) => {
        console.log(result);
        this.signedIn = false;
        this.storage.set('twittwerLoginStatus', false);

        this.storage.set('twittwerUser', null);
        this.setUserDetailsNull();

        let successMessage = this.toastCtrl.create({
          message: 'Signed you out from Twitter',
          position: 'top',
          cssClass: 'success',
          duration: 3000
        });

        successMessage.present();
      },
      (error) => {
        console.log(error);

        let errorMessage = this.toastCtrl.create({
          message: error,
          position: 'top',
          cssClass: 'failure',
          duration: 3000
        });

        errorMessage.present();
      }
    );
  }

  getIfSignedIn() {
    return this.signedIn;
  }

  getUserName() {
    return this.userName;
  }

  getUserId() {
    return this.userId;
  }
}
