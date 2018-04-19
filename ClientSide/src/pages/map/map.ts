import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { WelcomePage } from './../welcome/welcome';

declare var google;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})

export class MapPage {

  // Target the dom element
  @ViewChild('map') mapElement: ElementRef;
  navController: NavController;
  storageService: Storage;
  map: any;
  alwaysShowWelcomePage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public Storage: Storage) {
    this.navController = navCtrl;
    this.storageService = Storage;
    this.alwaysShowWelcomePage = false;
  
    this.handleWelcomeScreen();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    this.initMap();
  }

  initMap() {
    // Create a map object and specify the DOM element for display.
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: {
        lat: 59.329852,
        lng: 18.068461
      },
      zoom: 13,
	  disableDefaultUI: true
    });
  }

  handleWelcomeScreen() {
    if (this.alwaysShowWelcomePage)
      this.showWelcomeScreen();

    this.storageService.get('finalizedWelcome').then((state) => {
      if (!state) {
        this.showWelcomeScreen();
      }
    });
  }

  showWelcomeScreen() {
    this.navCtrl.push(WelcomePage);
  }
}
