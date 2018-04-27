import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { LanguageService } from './../../app/services/LanguageService';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
  @Component({
    templateUrl: 'eventsreporttypemodal.html'
  })

export class EventsreporttypemodalPage {
  languageService: LanguageService;
  translate: TranslateService;

  myParam: string = this.navParams.get('selectedType');
  events: object[];
  selection: string;
  form: string;
  selectedType: any;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public LanguageService: LanguageService,
    public translateService: TranslateService,
    params: NavParams
    
  ) 
  {
    this.events = [];
    this.languageService = LanguageService;
    this.translate = translateService;
    console.log("myparam: " + this.myParam)

    if(this.myParam != 'Select type'){
      this.selectedType = this.myParam;
    }

    const eventtypes = [
      {
        name: 'Car crash',
        subcategories: [
          'type1.1',
          'type1.2',
          'type1.3'
        ] 
      },
      {
        name: 'Traffic Jam',
        subcategories: [
          'type2.1',
          'type2.2',
          'type2.3'
        ]
      },
      {
        name: 'Obstacle',
        subcategories: [
          'type3.1',
          'type3.2',
          'type3.3'
        ]
      }
    ]


    for (let i = 0; i < eventtypes.length; i++) {
      this.events.push({
      eventtype: eventtypes[i].name,
      eventsubtype: eventtypes[i].subcategories
    });
  }

 

    //Use this to pass params to the modal when implementing logic
      console.log(this.myParam)
  }

  onSelectType(item) {
    this.selectedType = item;
    console.log(this.selectedType)
  }

  

  dismiss() {
    this.viewCtrl.dismiss(this.selectedType);
  }
}


