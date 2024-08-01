import { Injectable, TemplateRef, ViewChild } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { AccountService } from '@app/services/account.service';
// import { roles } from 'src/assets/constant';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    @ViewChild('changePasswordModal') changePasswordModal!: TemplateRef<any>;
    
    constructor(
        private router: Router,
        private modalService: NgbModal
        // private accountService: AccountService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Allow access to /reset-password route without authentication
    // if (state.url.startsWith('/reset-password')) {
    //     return true;
    // }

    if (state.url.includes('/reset-password')) {
        // debugger;
        // this.modalService.open(this.changePasswordModal, { centered: true });
        return true;
    }

    const userLogIn = JSON.parse(localStorage.getItem("user")! as string);
    
    if (userLogIn != null) {
        const { data } = route.data;
        if (data && !data.includes(userLogIn.id)) { 
            return false;
        }
        return true;
    } else
    if (localStorage.getItem("token") != null && Object.keys(route.data).length == 0) {
        return true;
    }
    if(route.data['isLogin']){
        return false;
    }
    else {
        // Redirect to login or other page if not logged in
        this.router.navigate(['/login']);
        return false;
    }
}


    // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    //     if (state.url.startsWith('/reset-password')) {
    //         return true;
    //     }
    //     const userLogIn = JSON.parse(localStorage.getItem("user")! as string)
        
    //     if (userLogIn !=null) {
    //         const { data } = route.data;
    //         if (data && !data.includes(userLogIn.id)) { 
    //             return false;
    //         }
    //         return true;
    //     }
    //     else {
    //         return true;
    //     }
    // }

    // canActivateWithRedirect(
    //     route: ActivatedRouteSnapshot,
    //     state: RouterStateSnapshot,
    //     redirectRoute: string
    //   ): boolean {
    //     // Condition with redirect
    //     if (!this.checkCondition()) {
    //       this.router.navigate([redirectRoute]);
    //       return false;
    //     }
    //     return true;
    //   }
}