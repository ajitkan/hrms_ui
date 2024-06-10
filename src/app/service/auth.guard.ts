import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// import { AccountService } from '@app/services/account.service';
// import { roles } from 'src/assets/constant';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        // private accountService: AccountService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const userLogIn = JSON.parse(localStorage.getItem("user")! as string)
        if (userLogIn !=null) {
            return false;
        }
        else {
            return true;
        }
    }

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