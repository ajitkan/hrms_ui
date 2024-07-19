// import { Injectable } from '@angular/core';
// import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
// import { Observable, map } from 'rxjs';

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { AuthService } from "./auth-service/auth.service";
import { map, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environments";

// import { environment } from '../../environments/environments';
// import { ApiService } from './api.service';
// import { AuthService } from './auth-service/auth.service';


// @Injectable()
// export class JwtInterceptor implements HttpInterceptor {
//     constructor(private accountService: ApiService,private authService:AuthService) { }

//     intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     
//         const user = this.authService.userValue;
        
//         const isApiUrl = request.url.startsWith(environment.apiUrl);
        
//         if (user && user.token && isApiUrl) {
//             request = request.clone({
//                 setHeaders: { Authorization: `${user.token}` }
//             });
//         }
//         else if (user && isApiUrl) {
//             request = request.clone({
//                 setHeaders: { Authorization: `${user}` }
//             });
//         }
//         return next.handle(request).pipe(map((event: HttpEvent<any>) => {
//             if (event instanceof HttpResponse) {
               
//                 if(event.body.token)
//                      sessionStorage.setItem('token',JSON.stringify(event.body.token ?event.body.token :event.body.value.token))
//                 else if(event.body.value && event.body.value.token)
//                      sessionStorage.setItem('token',JSON.stringify(event.body.token ?event.body.token :event.body.value.token))
//                 else if(event.body.token == '')
//                      sessionStorage.setItem('token',JSON.stringify(sessionStorage.getItem('token')as string))
                
//                 console.log("event occurrs:",event);
               
//             }
//             return event;
//         }));
       
//     }
// }


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private accountService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const user = this.accountService.userValue;
        if (!user) {
            // Handle case where user is not defined (possibly not logged in)
            console.warn('User is not defined. Proceeding without token.');
            return next.handle(request);
        }

        const isApiUrl = request.url.startsWith(environment.apiUrl);

        if (user.token && isApiUrl) {
            request = request.clone({
                setHeaders: { Authorization: `Bearer ${user.token}` }
            });
        } else {
            console.warn('User token is not available or request is not to API URL. Proceeding without token.');
        }
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    // Handle response if needed
                    console.log("Response event:", event);
                }
                return event;
            })
        );
    }
}
