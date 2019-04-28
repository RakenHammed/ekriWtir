import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlProviderService {
  serverUrl: string;

  constructor() {
    this.serverUrl = 'http://localhost:3000';
   }
}
