export class MapProcessor {

  private eventsQueue: any[] = [];

  //CONFIGURATION OPTIONS
  private tickInterval: number = 1000;
  private eventsPerTick: number = 10;

  public constructor() {
    this.start();
  }

  /**
   * loadEventsIntoQueue()
   * 
   * @param {any[]} events The events as defined by JSON to enqueue into the processor
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
      this.processEvent(event);
      this.eventsQueue.push(event);
    }
  }

  private processEvent(event: any) : void {
    if (event.drawable == undefined)
      this.prepareDrawable(event);


  }

  private prepareDrawable(event: any) : void {

  }

  /* ############################# */
  /* ##    GETTERS & SETTERS    ## */
  /* ############################# */

  public getEventsQueue() : JSON[] {
    return this.eventsQueue;
  }
}