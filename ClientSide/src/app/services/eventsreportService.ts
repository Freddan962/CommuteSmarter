import { Injectable } from '@angular/core';
import { HttpService } from './httpService';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';

@Injectable()
export class EventsReportService {  

  constructor(private httpService: HttpService) { 
    this.httpService = httpService;
  }


// this.httpService.sendDataToServer('/twitter/access', { userId: result.userId, userToken: result.token });


  sendReportToServer(report){
    
    this.httpService.sendDataToServer('/events/', { 
      color: report.color, 
      location: report.location, 
      lat: report.lat, 
      long: report.lng,
      category: report.category,
      reported: Date.now()
      });

      console.log('Sent report to server: ' + report)

    // let eventInfo = {
    //   color: req.body.color,
    //   location: req.body.location,
    //   lat: req.body.lat,
    //   long: req.body.long,
    //   category: req.body.category,
    //   reported: req.body.reported,
    //   description: req.body.description
    // };

    //send twitter user id
  }

}

// sendDataToServer(route, data) {
//   return this.http.post('https://pvt73trafficinfo.herokuapp.com/api/' + route, data)
//     .map(response => response.json())
// }
// }