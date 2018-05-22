import { MapEventStore } from './MapEventStore';

export class MapEventStoreHandler {
  private eventStores: MapEventStore[] = [];

  public addEventStore(eventStore: MapEventStore): void { this.eventStores.push(eventStore); }
  
  public addDeletedEvent(event: any): void {
    this.eventStores.forEach(store => { 
      store.addToStore('deleted', event);
    });
  }

  public addCreatedEvent(event: any): void {
    this.eventStores.forEach(store => {
      store.addToStore('created', event);
    });
  }
}