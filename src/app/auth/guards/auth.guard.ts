import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';

import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad, CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log('State: ', state);

    //return this.authService.auth.usuario ? true : false;
    return this.authService.verificaAutenticacion().pipe(
      tap((resp: boolean) => {
        if (!resp) {
          this.router.navigate(['/auth/login']);
        }
      })
    );
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    //return this.authService.auth.usuario ? true : false;
    return this.authService.verificaAutenticacion().pipe(
      tap((resp: boolean) => {
        if (!resp) {
          this.router.navigate(['/auth/login']);
        }
      })
    );
  }
}
