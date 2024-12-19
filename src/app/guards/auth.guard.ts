import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Observable } from "rxjs";



export const AuthGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const authServices = inject(AuthService);

    return new Observable<boolean>((observer) => {
        authServices.user$.subscribe(user => {
            if (user) {
                router.navigate(['/404']);
                alert('Cant access this page while logged in');
                observer.next(false);
            } else {
                observer.next(true);
            }
        });
    });
}