import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  public loaded = new BehaviorSubject<boolean>(true);
  private currentConnectionCount = 0;
  public customFlag = new BehaviorSubject<any>(false);

  constructor() {}

  subscribe(callback): any {
    this.loaded.asObservable().subscribe(callback);
  }

  newConnection(): any {
    this.currentConnectionCount++;
    this.loaded.next(false);
  }

  endConnection(): any {
    this.currentConnectionCount--;

    if (this.currentConnectionCount <= 0) {
      this.loaded.next(true);
      this.currentConnectionCount = 0;
      this.customFlag.next(false);
    }
  }

  setCustomFlag(value): any {
    this.customFlag.next(value);
  }
}
