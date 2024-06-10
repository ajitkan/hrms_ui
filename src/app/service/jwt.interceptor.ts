import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { environment } from '../../environments/environments';
import { ApiService } from './api.service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private accountService: ApiService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        const user = this.accountService.userValue;
        //const isLoggedIn = user?.token;
        const isApiUrl = request.url.startsWith(environment.apiUrl);
        // debugger;
        if (user && user.token && isApiUrl) {
            request = request.clone({
                setHeaders: { Authorization: `${user.token}` }
            });
        }
        else if (user && isApiUrl) {
            request = request.clone({
                setHeaders: { Authorization: `${user}` }
            });
        }

        return next.handle(request).pipe(map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                // debugger;
                if(event.body.token)
                     sessionStorage.setItem('token',JSON.stringify(event.body.token ?event.body.token :event.body.value.token))
                else if(event.body.value && event.body.value.token)
                     sessionStorage.setItem('token',JSON.stringify(event.body.token ?event.body.token :event.body.value.token))
                else if(event.body.token == '')
                     sessionStorage.setItem('token',JSON.stringify(sessionStorage.getItem('token')as string))
                
                console.log("event occurrs:",event);
                //event = event.clone({body: this.modifyBody(event.body)});
            }
            return event;
        }));
        //return next.handle(request);
        //debugger;
    }
}