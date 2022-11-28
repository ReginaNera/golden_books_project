import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { SpinnerService } from "../services/spinner.service";

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
    constructor(private spinnerService: SpinnerService ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       
        this.spinnerService.requestStarted();
        return this.handler(next, request);
    }

    handler(next, request) {
        return next.handle(request)
         .pipe(
            tap(
                (event) => {
                    if(event instanceof HttpResponse){
                        this.spinnerService.requestEnded();
                    }
                },
                (error: HttpErrorResponse) => {
                    this.spinnerService.resetSpinner();
                    throw error;
                
                }
            ),
         );
    }
}