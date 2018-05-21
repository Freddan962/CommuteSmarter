import { MapPage } from "../pages/map/map";

declare var google;

export class DrawableFactory {

  private markerStore: any = [];
  private lineStore: any = [];

  constructor(public mapPage: MapPage) { }
  
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
  public createInfoMarker(markerImage: any, position: any, event: any) : void {
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

  
  /* ############################# */
  /* ##    GETTERS & SETTERS    ## */
  /* ############################# */

  public getMarkerStore() : any[] { return this.markerStore; } 
  public getLineStore() : any[] { return this.lineStore; }
}