import { MapPage } from "../pages/map/map";

declare var google;

export class DrawableFactory {

  private markerStore: any = [];
  private lineStore: any = [];

  constructor(public mapPage: MapPage) { }

  public createMarker(position: any, color: any, data: any) : void {
    this.createInfoMarker('./assets/imgs/' + color + '.png', position, data);
  }

  public createEventInfoMarker(event: any) : void {
    let image = './assets/imgs/' + event.category + '_' + event.color + '.png';
    let position = new google.maps.LatLng(event.lat, event.long);
    this.createInfoMarker(image, position, event);
  }

  /**
   * createPath()
   *
   * Draws a line on the map from the startPos to the endPos with the desired color.
   *
   * @param {any} startPos The position to start routing from.
   * @param {any} endPos The position to route to.
   * @param {any} color The color of the line.
   * @memberof MapPage
   */
  public createPath(event: any) : void {
    let startPos = new google.maps.LatLng(event.lat, event.long);
    let endPos = new google.maps.LatLng(event.lat_end, event.long_end);

    let request = {
      origin: startPos,
      destination: endPos,
      travelMode: 'DRIVING'
    }

    let directionService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer;

    directionsDisplay.setMap(this.mapPage.map);
    directionsDisplay.setOptions({ suppressMarkers: true, preserveViewport: true });

    directionService.route(request, (result, status) => {
      this.renderDirection(result, event.color, event);
    });
  }
  
  /**
  * createInfoMarker()
  *
  * Adds a info markeron the map.
  *
  * @param {any} markerImage The image to be displayed.
  * @param {any} position The position of the marker.
  * @param {any} event 
  * @memberof MapPage
  */
  private createInfoMarker(markerImage: any, position: any, event: any) : void {
    let storeKey = event.category + "_" + event.color;
    if (!this.markerStore.hasOwnProperty(storeKey))
      this.markerStore[storeKey] = [];    

    let marker = this.addMarker(markerImage, position);
    this.markerStore.push(marker);
    event.marker = marker;

    marker.addListener('click', () => {
      this.mapPage.openMapEventInfo(event);
    });

    this.markerStore[storeKey].push(marker);   
  }

  /**
   * addMarker()
   *
   * Adds a marker to the map.
   *
   * @param {any} markerImage The image of the marker.
   * @param {any} position The position of the marker.
   * @returns
   * @memberof MapPage
   */
  private addMarker(markerImage, position) {
    let marker = new google.maps.Marker({
      map: this.mapPage.map,
      icon:
      new google.maps.MarkerImage(
        markerImage,
        null, /* size is determined at runtime */
        null, /* origin is 0,0 */
        null, /* anchor is bottom center of the scaled image */
        new google.maps.Size(25, 25) /* marker size */
      ),
      position: position
    });

    return marker;
  }

  /**
   * RenderDirection
   *
   * Responsible for rendering and hooking the polylines between the different events.
   *
   * @param {any} response The response from the directionService.route() call
   * @param {any} color The color of the road, e.g '#272E34'
   * @param {any} line The line object to draw
   * @memberof MapPage
   */
  private renderDirection(response: any, color: any, event: any) : void {
    let polylineOptions = {
      strokeColor: color,
      strokeOpacity: 1,
      strokeWeight: 4
    };

    //Fullösning bör igentligen hanteras på serversidan (dvs om en väg mellan punkterna ej hittas)
    if (response == null || response == undefined)
      return;

    let polylines = [];
    for (let i = 0; i < polylines.length; i++)
      polylines[i].setMap(null);

    let legs = response.routes[0].legs;
    for (let i = 0; i < legs.length; i++) {
      let steps = legs[i].steps;

      for (let j = 0; j < steps.length; j++) {
        let nextSegment = steps[j].path;
        let stepPolyline = new google.maps.Polyline(polylineOptions);

        for (let k = 0; k < nextSegment.length; k++)
          stepPolyline.getPath().push(nextSegment[k]);

        stepPolyline.setMap(this.mapPage.map);
        polylines.push(stepPolyline);

        google.maps.event.addListener(stepPolyline, 'click', (evt) => {
          this.mapPage.openMapEventInfo(event);
        })

        let storeKey = event.category + "_" + event.color;
        if (!this.lineStore.hasOwnProperty(storeKey))
          this.lineStore[storeKey] = [];    

        this.lineStore[storeKey].push(stepPolyline);
        event.drawable = stepPolyline;
      }
    }
  }
  
  /* ############################# */
  /* ##    GETTERS & SETTERS    ## */
  /* ############################# */

  public getMarkerStore() : any[] { return this.markerStore; } 
  public getLineStore() : any[] { return this.lineStore; }
}