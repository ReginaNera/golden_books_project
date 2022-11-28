import { HttpClient } from '@angular/common/http';
import { identifierName } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';



@Injectable({ providedIn: 'root' })
export class SpinnerService {
  private count =0;
  private spinner$ = new BehaviorSubject("");
    constructor(
    ) {}

    getSpinnerObserver() : Observable<string>{
        return this.spinner$.asObservable();
    }

    requestStarted() {
        if(++this.count === 1)
        {
            this.spinner$.next('start');
        }
    }

    requestEnded() {
        if(this.count === 0 || --this.count===0){
            this.spinner$.next('stop');

        }
    }

    resetSpinner() {
        this.count = 0;
        this.spinner$.next('stop')
    }
}