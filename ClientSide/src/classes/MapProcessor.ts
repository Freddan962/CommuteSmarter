import { DrawableFactory } from "./DrawableFactory";
import { MapPage } from "../pages/map/map";

export class MapProcessor {

  public drawableFactory: DrawableFactory;
  
  private eventsQueue: any[] = [];


  //CONFIGURATION OPTIONS
  private tickInterval: number = 100;
  private eventsPerTick: number = 1;

  public constructor(private mapPage: MapPage) {
    this.start();
    this.drawableFactory = new DrawableFactory(this.mapPage);
  }

  /**
   * loadEventsIntoQueue()
   * 
   * @param {any[]} events The events as objects to enqueue into the processor
   * @memberof MapProcessor
   */
  public loadEventsIntoQueue(events: any[]) : void {
    events.forEach((event) => { this.eventsQueue.push(event) });
  }

  private start() : void {
    setInterval(() => { this.process() }, this.tickInterval );
  }

  private process() : void {
    if (this.eventsQueue.length == 0) return;

    let eventsToTick = this.eventsQueue.length > this.eventsPerTick ? this.eventsPerTick : this.eventsQueue.length;

    for (let i = 0; i < eventsToTick; i++) {
      let event = this.eventsQueue.shift();
      if (this.shouldProcessEvent(event))
        this.processEvent(event);

      this.eventsQueue.push(event);
    }
  }

  private processEvent(event: any) : void {
    if (event.drawable == undefined)
      this.prepareDrawable(event);

    this.checkIfAlive(event);
  }

  private prepareDrawable(event: any) : void {
    if (this.isMarker(event)) 
      this.drawableFactory.createEventInfoMarker(event);
    else
      this.drawableFactory.createPath(event);
  }

  private isMarker(event: any) : boolean {
    if (event.lat_end != -100 && event.lng_end != -100)
      return false;

    return true;
  }

  private shouldProcessEvent(event: any) : boolean {
    if (!this.mapPage.chosenCategories.includes(event.category + '_' + event.color))
      return false;

    return true;
  }

  public clearEventQueueByFilter(filter: any) : void {
    this.eventsQueue.forEach((event) => {
      if (!filter.includes(event.category + '_' + event.color))
        this.eventsQueue.splice(this.eventsQueue.indexOf(event), 1);
    });
  }

  private checkIfAlive(event: any) : void {

  }

  /* ############################# */
  /* ##    GETTERS & SETTERS    ## */
  /* ############################# */

  public getEventsQueue() : any[] {
    return this.eventsQueue;
  }
}