import { inject } from "@angular/core";
import { CanMatchFn, Router,CanActivate } from "@angular/router";


import { AuthService } from "./auth.service";
export const authGuardGuard: CanMatchFn = (route, segments) => {
    const router = inject( Router );
    const authService = inject( AuthService );

   authService.getId()

    if (authService.isLoggedIn()) {
      	return true;
    }

	return router.createUrlTree(['/login']);
};

export const roleGuard: CanMatchFn = (route, segments) => {
    const router = inject( Router );
    const authService = inject( AuthService );

    if (authService.isLoggedIn()) {
      	//return (localStorage.getItem('ou').toUpperCase() == "IT");
        return  (authService.getRole().toUpperCase() != "USER" )? true : false;
    }

	return false;
};