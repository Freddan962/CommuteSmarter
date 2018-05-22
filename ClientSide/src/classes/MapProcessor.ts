import { DrawableFactory } from "./DrawableFactory";
import { MapPage } from "../pages/map/map";

export class MapProcessor {

  public drawableFactory: DrawableFactory;
  
  private eventsQueue: any[] = [];
  private eventDeletionQueue: any[] = [];

  private initialRun: boolean = true;
  private initialInterval: any;
  private activeInterval: any;

  //############################
  //## CONFIGURATION OPTIONS  ##
  //############################
  
  //FIRST PROCESSING ITERATION SPEED
  private initialTickInterval: number = 100;
  private initialEventsPertick: number = 10;

  //AFTER FIRST PROCESSING ITERATION
  private tickInterval: number = 1000;
  private eventsPerTick: number = 5;

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

  public clearEventQueueByFilter(filter: any) : void {
    this.eventsQueue.forEach((event) => {
      if (!filter.includes(event.category + '_' + event.color))
        this.eventsQueue.splice(this.eventsQueue.indexOf(event), 1);
    });
  }

  private start() : void {
    this.initialInterval = setInterval(() => { this.process(this.initialEventsPertick) }, this.initialTickInterval);
  }

  private process(eventsToTick) : void {
    if (this.eventsQueue.length == 0) return;

    let processedLastInIteration: boolean = false;
    
    //Make sure that if we have a small set of events we check all possible events
    eventsToTick = eventsToTick >= this.eventsQueue.length ? this.eventsQueue.length : eventsToTick;
    
    let lastEvent = this.eventsQueue[eventsToTick-1];

    for (let i = 0; i < eventsToTick; i++) {
      let event = this.eventsQueue.shift();
      
      if (processedLastInIteration == false) 
        processedLastInIteration = event.id == lastEvent.id;

      if (this.shouldProcessEvent(event))
        this.processEvent(event);

      if (this.eventDeletionQueue.indexOf(event.id) > -1) {
        this.handleEventDeletion(event);
        this.eventDeletionQueue.splice(this.eventDeletionQueue.indexOf(event.id), 1);
      } else 
        this.eventsQueue.push(event);
    }

    if (this.initialRun && processedLastInIteration) {  
      this.initialRun = false;
      clearInterval(this.initialInterval);
      let eventsToTick = this.eventsQueue.length > this.eventsPerTick ? this.eventsPerTick : this.eventsQueue.length;    
      this.activeInterval = setInterval(() => { this.process(eventsToTick) }, this.tickInterval );
    }
  } 

  private processEvent(event: any) : void {
    if (event.drawable == undefined) {
      this.prepareDrawable(event);
      return;
    }

    this.checkIfAlive(event);
  }

  private prepareDrawable(event: any) : void {
    this.isMarker(event) ? this.drawableFactory.createEventInfoMarker(event) : this.drawableFactory.createPath(event);
  }

  private isMarker(event: any) : boolean {
    if (event.lat_end != -100 && event.lng_end != -100)
      return false;
    
    return true;
  }
    
  public shouldProcessEvent(event: any) : boolean { 
    return this.mapPage.chosenCategories.includes(event.category + '_' + event.color);
  }

  private checkIfAlive(event: any) : void {
    this.mapPage.eventService.getEventById(event.id, data => {
      if (data.status != undefined && data.status == '404') {
        this.queueEventDeletion(event.id);
      }
    })
  }

  private queueEventDeletion(id: any) : void {
    this.eventDeletionQueue.push(id);
  }

  private handleEventDeletion(event: any) : void {
    event.drawable.setMap(null);
    this.eventsQueue.splice(this.eventsQueue.indexOf(event), 1);
  }

  /* ############################# */
  /* ##    GETTERS & SETTERS    ## */
  /* ############################# */

  public getEventsQueue() : any[] { return this.eventsQueue; }
}