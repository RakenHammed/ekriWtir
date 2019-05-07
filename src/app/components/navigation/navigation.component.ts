import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  localStorage: string;
  constructor() {

  }

  ngOnInit() { }

  isloggedIn(): boolean {
    if (localStorage.getItem('user')) {
      return true;
    } else {
      return false;
    }
  }

  logOut() {
    localStorage.clear();
  }

}
