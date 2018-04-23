import { Component, ViewChild, ElementRef} from '@angular/core';
import { NavController, ModalController,  } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { EventsreporttypemodalPage } from '../eventsreporttypemodal/eventsreporttypemodal';

@Component({
  templateUrl: 'eventsreport.html',
})

export class EventsReportPage {
  constructor(
    public navCtrl: NavController, 
    public modalCtrl: ModalController,
    private camera: Camera
  ) {}

  // Resizes the height of report description when text gets too long. 
  @ViewChild('myInput') myInput: ElementRef;
  resize() {
    let element = this.myInput['_elementRef'].nativeElement.getElementsByClassName("text-input")[0];
    let scrollHeight = element.scrollHeight;
    element.style.height = scrollHeight + 'px';
   
    if ((scrollHeight + 30) > 100){
      this.myInput['_elementRef'].nativeElement.style.height = (scrollHeight + 30) + 'px';
    }
  }
  


  //Open report type modal
  openReportTypeModal() {
    let modal = this.modalCtrl.create(EventsreporttypemodalPage);
    modal.present();
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
}




  
