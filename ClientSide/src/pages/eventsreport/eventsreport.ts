import { Component, ViewChild, ElementRef} from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { PositionselectorPage } from '../positionselector/positionselector';
import { EventsreporttypemodalPage } from '../eventsreporttypemodal/eventsreporttypemodal';

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
  constructor(
    public navCtrl: NavController, 
    public modalCtrl: ModalController,
    private camera: Camera,
    public alertCtrl: AlertController
  ) {
    this.defaultSelected = 'Select type';
    this.defaultLocation = 'Select Location'
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
    modal.onDidDismiss(data => {
      this.selectedType = data;
      this.activateSendButton()
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
      this.selectedLocation = data;
      this.activateSendButton()
    });
  }
  
  //photo api for adding photos - this needs more tweaking later
  takePhoto(sourceType: number) {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: sourceType,
    }

    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      console.log(base64Image);
    }, (err) => {
      // Handle error
    });
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
            console.log('Send clicked');
          }
        }
      ]
    });
    confirm.present();
  }
}




  
