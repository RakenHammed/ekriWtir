import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(
    private router: Router,
    private toastr: ToastrService,
  ) { }

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    if (token && token.length > 0) {
      return true;
    } else {
      this.toastr.error('You Must Login First', 'Warning', {
        timeOut: 1500
      });
      this.router.navigate(['/login']);
      return false;
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(
    public router: Router,
    private toastr: ToastrService,
  ) { }

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    const jwt = new JwtHelperService();
    const user = jwt.decodeToken(token);
    if (token && user.isAdministrator) {
      return true;
    }
    this.toastr.error('Only Administrator Can Access', 'Warning', {
      timeOut: 1500
    });
    this.router.navigate(['login']);
    return false;
  }
}
