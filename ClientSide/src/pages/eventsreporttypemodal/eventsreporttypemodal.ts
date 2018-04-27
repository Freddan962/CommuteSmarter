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
        name: 'Critical warnings',
        color: 'red',
        subcategories: [
          'Obstacle blocking the road',
          'Closed for event',
          'Other'
        ] 
      },
      {
        name: 'Be cautious',
        color: 'orange',
        subcategories: [
          'Obstacle on the road',
          'Traffic jam',
          'Road work',
          'Other'
        ]
      },
      {
        name: 'Other events',
        color: 'blue',
        subcategories: [
          'Police control',
          'Other'
        
        ]
      }
    ]


    for (let i = 0; i < eventtypes.length; i++) {
      this.events.push({
      eventtype: eventtypes[i].name,
      color: eventtypes[i].color,
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


