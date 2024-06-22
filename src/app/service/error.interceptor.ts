import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiService } from './api.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private accountService: ApiService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError((err:any) => {
            // debugger;
            if ([403].includes(err.status) && this.accountService.userValue) {
                // auto logout if 401 or 403 response returned from api
                    
                    console.error(err);
                    //this.accountService.logout();
                    return throwError(() => error);
            }
            else if ([401].includes(err.status) && this.accountService.userValue) {
                const error = "Session Expired Kindly LogIn again.....";
                console.error(err);
                this.accountService.logout();
                return throwError(() => error);
            }
            else {
                if(err.message === "Http failure response for https://localhost:7181/api/login: 0 Unknown Error"){
                    const error = "Server Down Kindly try again later.....";
                    console.error(err);
                    this.accountService.logout();
                    return throwError(() => error);
                }
                else if([404].includes(err.status)){
                    const error = err.error?.message || err.statusText;
                    console.error(err);
                    //this.accountService.logout();
                    return throwError(() => error);
                }
                else if([500].includes(err.status)){
                    const error = err.error?.message || err.statusText;
                    console.error(err);
                    this.accountService.logout();
                    return throwError(() => error);
                }
                else{
                    const error = err.error?.message || err.statusText;
                    console.error(err);
                    // this.accountService.logout();
                    return throwError(() => error);
                }
                // console.error(err);
                // this.accountService.logout();
               // Http failure response for https://localhost:7181/api/login: 0 Unknown Error
            }
            const error = err.error?.message || err.statusText;
            console.error(err);
            return throwError(() => error);
        }
        
        ))
    }
}