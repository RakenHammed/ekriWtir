import { Component, OnInit, Inject, Renderer, ElementRef, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';
import { DOCUMENT } from '@angular/platform-browser';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ConnectionService } from 'ng-connection-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private _router: Subscription;
  @ViewChild(NavbarComponent) navbar: NavbarComponent;
  isConnected: boolean;

  constructor(
    private renderer: Renderer,
    private router: Router,
    @Inject(DOCUMENT)
    private document: any,
    private element: ElementRef,
    public location: Location,
    private connectionService: ConnectionService,
    private toastr: ToastrService,
  ) {
    this.connectionService.monitor().subscribe(isConnected => {
      this.isConnected = isConnected;
      if (!this.isConnected) {
        this.toastr.error('No Internet Connection', 'Warning', {
          timeOut: 1000
        });
      } else {
        this.toastr.success('You Are Online', 'Success', {
          timeOut: 1000
        });
      }
    })
  }
  ngOnInit() {
    var navbar: HTMLElement = this.element.nativeElement.children[0].children[0];
    this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
      if (window.outerWidth > 991) {
        window.document.children[0].scrollTop = 0;
      } else {
        window.document.activeElement.scrollTop = 0;
      }
      this.navbar.sidebarClose();
      const navigationForbidden = !(this.router.url.indexOf('login') > 0
        || this.router.url.indexOf('create-account') > 0
        || localStorage.token);
      if (navigationForbidden) {
        this.router.navigate(['/login']);
        this.toastr.error('You Must Login First', 'Warning', {
          timeOut: 1500
        });
      }
      this.renderer.listenGlobal('window', 'scroll', (event) => {
        const number = window.scrollY;
        var _location = this.location.path();
        _location = _location.split('/')[2];

        if (number > 150 || window.pageYOffset > 150) {
          navbar.classList.remove('navbar-transparent');
        } else if (_location !== 'login' && this.location.path() !== '/nucleoicons') {
          // remove logic
          navbar.classList.add('navbar-transparent');
        }
      });
    });
  }
}
