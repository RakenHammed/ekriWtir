import { Component, OnInit, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  private toggleButton: any;
  private sidebarVisible: boolean;
  localStorage: string;

  constructor(
    public location: Location,
    private element: ElementRef,
    private router: Router,
  ) {
    this.sidebarVisible = false;
  }

  ngOnInit() {
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
  }
  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const html = document.getElementsByTagName('html')[0];
    setTimeout(function () {
      toggleButton.classList.add('toggled');
    }, 500);
    html.classList.add('nav-open');

    this.sidebarVisible = true;
  };
  sidebarClose() {
    const html = document.getElementsByTagName('html')[0];
    // console.log(html);
    this.toggleButton.classList.remove('toggled');
    this.sidebarVisible = false;
    html.classList.remove('nav-open');
  };
  sidebarToggle() {
    // const toggleButton = this.toggleButton;
    // const body = document.getElementsByTagName('body')[0];
    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
  };

  isDocumentation() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee === '/documentation') {
      return true;
    } else {
      return false;
    }
  }

  isloggedIn(): boolean {
    if (localStorage.getItem('user')) {
      return true;
    } else {
      return false;
    }
  }

  isAdministrator(): boolean {
    if (this.isloggedIn()) {
      if (JSON.parse(localStorage.getItem('user')).isAdministrator) {
        return true;
      }
    } else {
      return false;
    }
  }

  userIsInCreateAccountPage() {
    return this.router.url.indexOf('create-account') > 0;
  }

  logOut() {
    localStorage.clear();
  }

}
