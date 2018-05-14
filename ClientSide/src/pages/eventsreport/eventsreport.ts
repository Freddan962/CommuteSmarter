import { Component, ViewChild, ElementRef} from '@angular/core';
import { NavController, ModalController, AlertController, ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { PositionselectorPage } from '../positionselector/positionselector';
import { EventsreporttypemodalPage } from '../eventsreporttypemodal/eventsreporttypemodal';
import { TranslateService } from '@ngx-translate/core';
import { DomSanitizer } from '@angular/platform-browser';
import { EventsReportService } from './../../app/services/eventsreportService';


@Component({
  templateUrl: 'eventsreport.html',
})

export class EventsReportPage {
  defaultSelected: string;
  defaultLocation: string;
  selectedType: any;
  selectedLocation: any;
  reportDescription: any;
  isenabled: boolean;
  settings: any;
  color: any;
  category: string;
  selectedLocationLatLng: any[]
  reportSent: boolean;
  public eventImage: string;

  constructor(
    public navCtrl: NavController, 
    public modalCtrl: ModalController,
    private camera: Camera,
    public alertCtrl: AlertController,
    private DomSanitizer: DomSanitizer,
    private EventsReportService: EventsReportService,
    public toastCtrl: ToastController
  ) {
    this.defaultSelected = 'selectType';
    this.defaultLocation = 'selectLocation'
    this.selectedType = this.defaultSelected; 
    this.selectedLocation = this.defaultLocation;
  }

  // Resizes the height of report description when text gets too long. 
  @ViewChild('descriptionInput') descriptionInput: ElementRef;
  resize() {
    let element = this.descriptionInput['_elementRef'].nativeElement.getElementsByClassName("text-input")[0];
    let scrollHeight = element.scrollHeight;
    element.style.height = scrollHeight + 'px';
   
    if ((scrollHeight + 30) > 100){
      this.descriptionInput['_elementRef'].nativeElement.style.height = (scrollHeight + 30) + 'px';
    }
  }

  //Open report type modal
  openReportTypeModal() {
    let myParam = { selectedType: this.selectedType}
    let modal = this.modalCtrl.create(EventsreporttypemodalPage, myParam);
    modal.present();
    modal.onDidDismiss((data)  => {
      if (!(data === undefined)){
        this.selectedType = data.type;
        this.category = data.category;
        this.color = data.color;
        this.activateSendButton()
      }
    });
  }

  //Activates the send button if criteria is fullfilled
 activateSendButton(){
   if (this.selectedType != this.defaultSelected && this.selectedLocation != this.defaultLocation) {
     this.isenabled = true;
   }
 }

  //Open position picker modal
  openPositionPickerModal() {
    let modal = this.modalCtrl.create(PositionselectorPage);
    modal.present();

    modal.onDidDismiss(data => {
      this.selectedLocation = data.location;
      this.selectedLocationLatLng = [data.lat, data.lng]
      console.log(this.selectedLocationLatLng)
      this.activateSendButton()
    });
  }
  
  //photo api for adding photos - this needs more tweaking later
  takePhoto(sourceType: number) {
    if (document.URL.startsWith('http')) {
      this.setImage()
    }else{
      const options: CameraOptions = {
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 1000,
        targetHeight: 1000,
        correctOrientation: true,
        sourceType: 0,
        mediaType: 0       
    }

    this.camera.getPicture(options).then((imageData) => {
      this.eventImage = 'data:image/jpeg;base64,' + imageData;
      console.log(this.eventImage);
      // this.imageAdded()
    }, (err) => {
      // Handle error
    });
  }
  }

  
  // imageAdded(){
  //   return this.eventImage == undefined
  // }

setImage(){
  this.eventImage = 'data:image/gif;base64,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'
}

// Alert modal to confirm report details
  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Confirm report',
      message:
        `<p>${this.selectedType} at ${this.selectedLocation}.<p>
        <p>Description:<\p>
        <p>${ this.reportDescription}</p>
      `,
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: () => {
            this.sendReport();
            console.log('Send clicked');
          }
        }
      ]
    });
    confirm.present();
  }

  sendReport(){
    this.showToastWithCloseButton()
    let report = {
      color: this.color,
      // type: this.selectedType,
      location: this.selectedLocation,
      lat: this.selectedLocationLatLng[0],
      long: this.selectedLocationLatLng[1],
      category: this.selectedType,
      description: this.reportDescription,
      image: this.eventImage,
    }

    console.log(report)
    this.EventsReportService.sendReportToServer(report)
    this.reportSent = true;
    this.isenabled = !this.isenabled;
  }

  showToastWithCloseButton() {
    const toast = this.toastCtrl.create({
      message: 'Your report were successfully sent!',
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    toast.present();
  }
}