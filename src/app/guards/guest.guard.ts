import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Observable } from "rxjs";


export const GuestGuard: CanActivateFn = (route, state) => {
    const router = inject(Router)
    const authServices = inject(AuthService);
    
    return new Observable<boolean>((observer) => {
        authServices.user$.subscribe(user => {
            if (!user) {
                router.navigate(['/auth/login']);
                alert('You need to log in to access this page');
                observer.next(false);
            } else {
                observer.next(true);
            }
        });
    });
}