import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

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

  ) 
  {
    //Use this to pass params to the modal when implementing logic
    // this.myParam = params.get('myParam');
  }
  
  dismiss() {
    this.viewCtrl.dismiss();
  }
}


