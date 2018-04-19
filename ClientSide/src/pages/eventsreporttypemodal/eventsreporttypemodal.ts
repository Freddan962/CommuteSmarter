import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the EventsreporttypemodalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
  @Component({
    templateUrl: 'eventsreporttypemodal.html'
  })
  
export class EventsreporttypemodalPage {
  myParam: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    params: NavParams

  ) {
    this.myParam = params.get('myParam');
  }
  



 

  dismiss() {
    this.viewCtrl.dismiss();
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad EventsreporttypemodalPage');
  }

}


