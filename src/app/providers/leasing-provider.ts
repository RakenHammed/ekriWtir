import { Rentee } from '../models/user';
import { UrlProviderService } from './url-provider.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Car } from '../models/car';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class LeasingProviderService {

  constructor(
    private http: HttpClient,
    private urlProvider: UrlProviderService,
  ) {
  }

  createLeasingDemand(rentee: Rentee): Observable<Rentee> {
    const token: string = localStorage.getItem('token');
    const options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token),
    }
    return this.http.post<Rentee>(this.urlProvider.serverUrl + '/leasingDemands/' , rentee,options);
  }

  getleasingDemands(): Observable<Rentee[]> {
    const token: string = localStorage.getItem('token');
    const options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token),
    }
    return this.http.get<Rentee[]>(this.urlProvider.serverUrl + '/leasingDemands/',options);
  }

  updateLeasingDemand(rentee: Rentee): Observable<Rentee> {
    const token: string = localStorage.getItem('token');
    const options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token),
    }
    return this.http.put<Rentee>(this.urlProvider.serverUrl + '/leasingDemands/' + rentee.id, rentee,options);
  }

  deleteLeasingDemand(renterId: number) {
    const token: string = localStorage.getItem('token');
    const options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token),
    }
    return this.http.delete<Rentee>(this.urlProvider.serverUrl + '/leasingDemands/' + renterId,options);
  }





}
