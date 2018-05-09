import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { TwitterConnect } from '@ionic-native/twitter-connect';
import { ToastController } from 'ionic-angular';
import { HttpService } from './httpService';

@Injectable()
export class LoginWithTwitterService {

  private signedIn: boolean;
  private userName: string;
  private userId: string;
  private secret: string;
  private token: string;

  constructor(private twitter: TwitterConnect,
    private storage: Storage,
    private toastCtrl: ToastController,
    private httpService:HttpService) {
      this.storage.get('twitterUser').then((twitterUser) => {
        if(twitterUser === undefined || twitterUser === null) {
          this.setUserDetailsNull();
          this.signedIn = false;
        } else  {
          this.setAllUserDetails(twitterUser);
          this.signedIn = true;
        }
      });
  }

  loginWithTwitter() {
    this.twitter.login().then(
      (result) => {
        console.log(result);
        this.signedIn = true;
        this.storage.set('twittwerLoginStatus', true);

        this.storage.set('twitterUser', result);
        this.setAllUserDetails(result);

        this.httpService.sendDataToServer('/twitter/access', { userId: result.userId, userToken: result.token, userTokenSecret: result.secret });

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

  private setAllUserDetails(twitterUser) {
    this.userName = twitterUser.userName;
    this.userId = twitterUser.userId;
    this.secret = twitterUser.secret;
    this.token = twitterUser.token;
  }

  logOutTwitter() {
    this.twitter.logout().then(
      (result) => {
        console.log(result);
        this.signedIn = false;
        this.storage.set('twittwerLoginStatus', false);

        this.storage.set('twitterUser', null);
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
