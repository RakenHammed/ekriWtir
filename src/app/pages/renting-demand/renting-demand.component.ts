import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { LeasingProviderService } from 'app/providers/leasing-provider';
import { Component, OnInit } from '@angular/core';
import * as Rellax from 'rellax';
import { Rentee, Renter, User } from 'app/models/user';
import { Airport } from 'app/models/airport';
import { Car } from 'app/models/car';
import { RentingProviderService } from '../../providers/renting-provider.service';


@Component({
  selector: 'app-renting-demand',
  templateUrl: './renting-demand.component.html',
  styleUrls: ['./renting-demand.component.scss']
})
export class RentingDemandComponent implements OnInit {
  public rentingDemandForm: FormGroup;
  page: number;
  totalCount: number;
  rentees: Rentee[];
  currentlyOpenLeasingDemand: Rentee;
  cars: Car[];
  currentlyOpenCar: any;

  constructor(private formBuilder: FormBuilder,
    private leasingProvider: LeasingProviderService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private rentingProvider: RentingProviderService
  ) {
    this.createForm();
  }

  createForm() {
    this.rentingDemandForm = this.formBuilder.group({
      driverLicenseId: ['', [
        Validators.required,
        Validators.pattern(
          /^[0-9]+$/
        ),
      ]],
      driverLicenseDateOfIssue: ['', Validators.required],
      privateKey: ['', Validators.required],
    });
  }

  ngOnInit() {
    var rellaxHeader = new Rellax('.rellax-header');
    var body = document.getElementsByTagName('body')[0];
    body.classList.add('landing-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
    this.leasingProvider.getleasingDemands().subscribe(rentees => {
      this.rentees = rentees
      this.totalCount = rentees.length;
    });
    this.page = 1;
    this.getAvailableCars(this.page);
  }

  ngOnDestroy() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('landing-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
  }

  // getRentingDemands(currentPage: number) {
  //   this.rentingProvider.getRentingDemands().subscribe(rentee => {
  //     this.totalCount = rentee.length;
  //     this.rentees = rentee.splice((currentPage - 1) * 10, 10)
  //   });
  // }

  getAvailableCars(currentPage: number) {
    this.rentingProvider.getAvailableCars().subscribe(cars => {
      this.totalCount = cars.length;
      this.cars = cars.splice((currentPage - 1) * 10, 10)
    });
  }


  openLg(content, car: Car) {
    this.currentlyOpenCar = car;
    console.log(this.currentlyOpenCar)
    this.modalService.open(content, { size: 'lg' });
  }

  openRentingDemandModal(content, car: Car) {
    this.currentlyOpenCar = car;
    this.modalService.open(content, { size: 'lg' });
  }

  onSubmit(rentingDemandForm: NgForm, car: Car) {
    this.spinner.show('loginSpinner', {
      type: 'ball-spin-fade-rotating',
      size: 'medium',
      bdColor: 'rgba(51,51,51,0.04)',
      color: 'orange'
    });
    const renter = new Renter;
    renter.user = new User();
    const token: string = localStorage.getItem('token');
    const jwt = new JwtHelperService();
    const user = jwt.decodeToken(token);
    renter.userId = user.id;
    renter.driverLicenseId = rentingDemandForm.value.driverLicenseId;
    renter.driverLicenseDateOfIssue = rentingDemandForm.value.driverLicenseDateOfIssue;
    car.renter = renter;
    const privateKey = rentingDemandForm.value.privateKey;
    if (this.checkForm()) {
      this.rentingProvider.createRentingDemand(car, privateKey)
        .subscribe(
          response => {
            this.spinner.hide('loginSpinner');
            this.toastr.success('Your Renting Demand is sent', 'Success', {
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
    if (this.rentingDemandForm.valid) {
      return true;
    } else {
      this.toastr.error('Invalid inputs', 'Warning', {
        timeOut: 2000,
      });
      return false;
    }
  }

}
