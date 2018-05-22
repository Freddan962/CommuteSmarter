export class MapEventStore {
  private storage: any = {};
  private currIndexPointer: number = 0;

  public addToStore(key: string, obj: any): void { 
    if (!Object.keys(this.storage).indexOf(key))
      this.storage[key] = [];

    this.storage[key].push(obj);
  }

  public getStorage(): any { return this.storage; }
  public clear(): void { this.storage = {}; }
}
