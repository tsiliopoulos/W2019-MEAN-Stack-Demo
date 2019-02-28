import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';




@Injectable()
export class AuthGuard implements CanActivate {
  path: import ('@angular/router').ActivatedRouteSnapshot[];
  route: import ('@angular/router').ActivatedRouteSnapshot;

  constructor(
    private authService: AuthService,
    private router: Router)
    {

    }

  canActivate(): boolean {
    if (this.authService.LoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
