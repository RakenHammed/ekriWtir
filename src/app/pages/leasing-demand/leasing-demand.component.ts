import { JwtHelperService } from '@auth0/angular-jwt';
import { Airport } from './../../models/airport';
import { User } from 'app/models/user';
import { Rentee } from '../../models/user';
import { LeasingProviderService } from '../../providers/leasing-provider';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Airports } from '../../models/airport';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Car } from '../../models/car';



@Component({
  selector: 'app-save-care',
  templateUrl: './leasing-demand.component.html',
  styleUrls: ['./leasing-demand.component.scss']
})
export class SaveCareComponent implements OnInit {
  public saveCarForm: FormGroup;
  public airports = new Airports;


  constructor(private formBuilder: FormBuilder,
    private toastr: ToastrService,
    public router: Router,
    private spinner: NgxSpinnerService,
    private leasingProviderService: LeasingProviderService
  ) {
    this.createForm();
  }

  createForm() {
    this.saveCarForm = this.formBuilder.group({
      nationalId: ['', [
        Validators.required,
        Validators.pattern(
          /^[0-9]+$/
        ),
      ]],
      phoneNumber: ['', [
        Validators.required,
        Validators.pattern(
          /^[0-9]+$/
        ),
      ]],
      manufacturer: ['', Validators.required],
      model: ['', Validators.required],
      firstCirculationDate: ['', Validators.required],
      fuelType: ['', Validators.required],
      airport: ['', Validators.required],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      costPerDay: ['', [
        Validators.required,
        Validators.pattern(
          /^[0-9]+$/
        ),
      ]],
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

  onSubmit(saveCarForm: NgForm) {
    this.spinner.show('loginSpinner', {
      type: 'ball-spin-fade-rotating',
      size: 'medium',
      bdColor: 'rgba(51,51,51,0.04)',
      color: 'orange'
    });
    const car = new Car;
    car.manufacturer = saveCarForm.value.manufacturer,
      car.model = saveCarForm.value.model,
      car.firstCirculationDate = saveCarForm.value.firstCirculationDate,
      car.fuelType = saveCarForm.value.fuelType,
      car.fromDate = saveCarForm.value.fromDate,
      car.toDate = saveCarForm.value.toDate,
      car.pricePerDay = saveCarForm.value.costPerDay;
    const rentee = new Rentee;
    rentee.user = new User();
    const token: string = localStorage.getItem('token');
    const jwt = new JwtHelperService();
    const user = jwt.decodeToken(token);
    rentee.user.id = user.id;
    rentee.airport = new Airport,
      user.nationalId = saveCarForm.value.nationalId,
      user.phoneNumber = saveCarForm.value.phoneNumber,
      rentee.airport = saveCarForm.value.airport.name,
      rentee.user = user;
    rentee.car = car;
    if (this.checkForm()) {
      return this.leasingProviderService.createLeasingDemand(rentee)
        .subscribe(
          response => {
            this.spinner.hide('loginSpinner');
            this.toastr.success('You Leasing Demand is inserted', 'Success', {
              timeOut: 2000 
            });
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
    if (this.saveCarForm.valid) {
      return true;
    } else {
      this.toastr.error('Invalid inputs', 'Warning', {
        timeOut: 2000,
      });
      return false;
    }
  }

}
