import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FormService  {
  private readonly _answers$ = new BehaviorSubject<any>(null);
  constructor() {
  }

  public getAnswers(): Observable<any> {
    return this._answers$.asObservable();
  }

  public setAnswers(value: any): void {
    this._answers$.next(value);
  }
 
}
