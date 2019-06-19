import { Component, OnInit } from '@angular/core';
import * as Rellax from 'rellax';
import { User, Rentee } from 'app/models/user';
import { UserProviderService } from 'app/providers/user-provider.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { NgbTabChangeEvent, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LeasingProviderService } from 'app/providers/leasing-provider';

@Component({
  selector: 'app-admin-space',
  templateUrl: './admin-space.component.html',
  styleUrls: ['./admin-space.component.scss']
})
export class AdminSpaceComponent implements OnInit {
  data: Date = new Date();
  focus;
  focus1;
  users: User[];
  page: number;
  totalCount: number;
  rentees: Rentee[];
  currentlyOpenLeasingDemand: Rentee;

  constructor(
    private userProvider: UserProviderService,
    private leasingProvider: LeasingProviderService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private modalService: NgbModal,
  ) {
  }

  ngOnInit() {
    var rellaxHeader = new Rellax('.rellax-header');
    var body = document.getElementsByTagName('body')[0];
    body.classList.add('landing-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
    this.userProvider.getUsers().subscribe(users => {
      this.users = users
      this.totalCount = users.length;
    });
    this.page = 1;
    this.getUsers(this.page);
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('landing-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
  }

  getUsers(currentPage: number) {
    this.userProvider.getUsers().subscribe(users => {
      this.totalCount = users.length;
      this.users = users.splice((currentPage - 1) * 10, 10)
    });
  }

  changePage(currentPage) {
    this.getUsers(currentPage);
  }

  deleteUser(userId: number) {
    this.spinner.show('loginSpinner', {
      type: 'ball-spin-fade-rotating',
      size: 'medium',
      bdColor: 'rgba(51,51,51,0.04)',
      color: 'orange'
    });
    this.userProvider.deleteUser(userId).subscribe(
      () => {
        this.getUsers(this.page)
        this.spinner.hide('loginSpinner');
        this.toastr.success('User Deleted', 'Success', {
          timeOut: 2000
        });
      },
      error => {
        this.spinner.hide('loginSpinner');
        this.toastr.error(error.error.message, 'Warning', {
          timeOut: 2000,
        });
      } ,
    );
  }

  beforeChange(event: NgbTabChangeEvent) {
    switch (event.nextId) {
      case '1':
        this.page = 1;
        this.getUsers(this.page);
        break;
      case '2':
        break;
      case '3':
        this.page = 1;
        this.getLeasingDemands(this.page);
        break;
      case '4':

        break;

      default:
        break;
    }
  }

  getLeasingDemands(currentPage: number) {
    this.leasingProvider.getleasingDemands().subscribe(rentee => {
      this.totalCount = rentee.length;
      this.rentees = rentee.splice((currentPage - 1) * 10, 10)
    });
  }

  openLg(content, leasingDemand: Rentee) {
    this.currentlyOpenLeasingDemand = leasingDemand;
    this.modalService.open(content, { size: 'lg' });
  }

  acceptLeasingDemand(leasingDemand: Rentee) {
    this.leasingProvider.acceptLeasingDemand(leasingDemand).subscribe(
      response => {
        this.page = 1;
        this.getLeasingDemands(this.page);
        this.toastr.success('Leasing Demand Accepted', 'Success', {
          timeOut: 1000
        });
        this.modalService.dismissAll();
        this.spinner.hide('loginSpinner');
      },
      error => {
        this.spinner.hide('loginSpinner');
        this.toastr.error(error.error.message, 'Warning', {
          timeOut: 2000,
        });
      }
    );
  }

  declineLeasingDemand(id: number) {
    this.leasingProvider.deleteLeasingDemand(id).subscribe(
      response => {
        this.page = 1;
        this.getLeasingDemands(this.page);
        this.toastr.success('Leasing Demand Deleted', 'Success', {
          timeOut: 1000
        });
        this.modalService.dismissAll();
        this.spinner.hide('loginSpinner');
      },
      error => {
        this.spinner.hide('loginSpinner');
        this.toastr.error(error.error.message, 'Warning', {
          timeOut: 2000,
        });
      }
    );
    this.modalService.dismissAll();
  }
}

