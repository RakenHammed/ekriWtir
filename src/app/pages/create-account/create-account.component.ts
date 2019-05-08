import { UserProviderService } from './../../providers/user-provider.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http'
import { UrlProviderService } from '../../providers/url-provider.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { User } from 'app/models/user';


@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
})
export class CreateAccountComponent implements OnInit {
  createAccountForm: FormGroup;
  private user: User;

  constructor(private formBuilder: FormBuilder,
    public router: Router,
    private urlProvider: UrlProviderService,
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private userProviderService: UserProviderService,
  ) {
    this.createForm();
  }

  createForm() {
    this.createAccountForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    email: ['', [
      Validators.required,
      Validators.pattern(
        // tslint:disable-next-line: max-line-length
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ),
    ]],
      birthDate: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

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

  onSubmit(CreateAccountForm: NgForm) {
    this.spinner.show('loginSpinner', {
      type: 'ball-spin-fade-rotating',
      size: 'medium',
      bdColor: 'rgba(51,51,51,0.04)',
      color: 'orange'
    });
    const user: User = {
      firstName: CreateAccountForm.value.firstName,
      lastName: CreateAccountForm.value.lastName,
      email: CreateAccountForm.value.email,
      password: CreateAccountForm.value.password,
      birthDate: CreateAccountForm.value.birthDate,
    }
    if (this.checkForm()) {
      return this.userProviderService.createUser(user)
        .subscribe(
          response => {
            this.spinner.hide('loginSpinner');

          },
          error => {
            this.spinner.hide('loginSpinner');
            this.toastr.error(error.error.message, 'Warning', {
              timeOut: 2000,
            });
          });
    }
    this.spinner.hide('loginSpinner');
  }

  checkForm(): boolean {
    const emailStatus: string = this.createAccountForm.controls.email.status;
    const firstNameStatus: string = this.createAccountForm.controls.firstName.status;
    const lastNameStatus: string = this.createAccountForm.controls.lastName.status;
    const passwordStatus: string = this.createAccountForm.controls.password.status;
    const birthDateStatus: string = this.createAccountForm.controls.birthDate.status;
    if ((emailStatus === 'VALID') && (firstNameStatus === 'VALID') && (lastNameStatus === 'VALID')
      && (passwordStatus === 'VALID') && (birthDateStatus === 'VALID')) {
      return true;
    } else {
      this.toastr.error('Invalid inputs', 'Warning', {
        timeOut: 2000,
      });
      return false;
    }
  }



}
