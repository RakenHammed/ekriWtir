import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http'
import { UrlProviderService } from '../../providers/url-provider.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  data: Date = new Date();
  focus;
  focus1;

  constructor(
    public router: Router,
    private urlProvider: UrlProviderService,
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
  ) { }


  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('login-page');

    const navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
  }

  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('login-page');

    const navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
  }

  onSubmit(loginForm: NgForm) {
    this.spinner.show('loginSpinner', {
      type: 'ball-spin-fade-rotating',
      size: 'medium',
      bdColor: 'rgba(51,51,51,0.04)',
      color: 'orange'
    });
    const loginInfo = {
      email: loginForm.value.email,
      password: loginForm.value.password,
    }
    if (this.checkEmail(loginInfo.email) && loginInfo.password.length > 0) {
      return this.http.post<any>(`${this.urlProvider.serverUrl}/users/login/`, loginInfo)
        .subscribe(
          response => {
            this.spinner.hide('loginSpinner');
            const token = response;
            localStorage.setItem('token', response);
            const jwt = new JwtHelperService();
            const user = jwt.decodeToken(token);
            localStorage.setItem('user', JSON.stringify(user));
            this.router.navigate(['/index']);
          },
          error => {
            this.spinner.hide('loginSpinner');
            this.toastr.error(error.error.message, 'Warning', {
              timeOut: 2000,
            });
          })
    }
  }

  checkEmail(email: string): boolean {
    const regexEmail =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexEmail.test(email);
  }
}
