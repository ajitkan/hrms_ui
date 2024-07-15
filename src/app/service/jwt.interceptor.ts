

import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { AuthService } from "./auth-service/auth.service";
import { catchError, map, Observable, throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environments";
import { json } from "d3";


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private accountService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const user = this.accountService.userValue;
        if (!user && !localStorage.getItem('token')) {
            
            console.warn('User is not defined. Proceeding without token.');
            return next.handle(request);
        }

        const isApiUrl = request.url.startsWith(environment.apiUrl);

        if (user && user.token && isApiUrl) {
            request = request.clone({
                setHeaders: { Authorization: `Bearer ${user.token}` }
            });
        }else
        if (user && isApiUrl) {
            request = request.clone({
                setHeaders: { Authorization: `Bearer ${user}` }
            });
        }
        else
        if (localStorage.getItem('token') && isApiUrl) {
            request = request.clone({
                setHeaders: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('token')as string)}` }
            });
        }else {
            console.warn('User token is not available or request is not to API URL. Proceeding without token.');
        }

        return next.handle(request).pipe(map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                //  debugger;
                if(event.body.token)
                     sessionStorage.setItem('token',JSON.stringify(event.body.token ?event.body.token :event.body.value.token))
                else if(event.body.value && event.body.value.token)
                     sessionStorage.setItem('token',JSON.stringify(event.body.token ?event.body.token :event.body.value.token))
                // else if(event.body.token == '')
                //      sessionStorage.setItem('token',JSON.stringify(sessionStorage.getItem('token')as string))
                
                console.log("event occurrs:",event);
                //event = event.clone({body: this.modifyBody(event.body)});
            }
            return event;
        }));
        //return next.handle(request);
        //debugger;
    }
}
