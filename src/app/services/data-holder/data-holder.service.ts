import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataHolderService {
  private readonly loading$ = new BehaviorSubject<boolean>(false);
  constructor() {
  }
  set loading(value: boolean) {
    this.loading$.next(value);
  }
  get isLoading(): Observable<boolean> {
    return this.loading$.asObservable();
  }

}
