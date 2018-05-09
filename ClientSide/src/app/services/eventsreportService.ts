import { Injectable } from '@angular/core';
// import { HttpService } from './httpService';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class EventsReportService {  

  constructor(/*private httpService: HttpService,*/ private http: Http) { 
    // this.httpService = httpService;
  }

  sendReportToServer(report){
    const reqData = {
      color: report.color,
      location: report.location,
      lat: report.lat,
      long: report.long,
      reported: new Date(),
      category: report.category,
      description: report.description,
    }

    let headers = new Headers();
    headers.append('Content-Type', 'application/json')


    // let url = 'http://localhost:3000/api/events'; 
    let url = 'https://pvt73trafficinfo.herokuapp.com/api/events'; //
    this.http.post(url, JSON.stringify(reqData), {headers: headers})
    .map(res => res.json())
    .subscribe(data => {
        console.log('server response:'),
        console.log(data)
    }
    )
    console.log('Report sent to server:')
  }
}