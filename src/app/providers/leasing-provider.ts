import { Rentee } from '../models/user';
import { UrlProviderService } from './url-provider.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    return this.http.post<Rentee>(this.urlProvider.serverUrl + '/leasingDemands/', rentee);
  }

  getleasingDemands(): Observable<Rentee[]> {
    return this.http.get<Rentee[]>(this.urlProvider.serverUrl + '/leasingDemands/');
  }

  updateLeasingDemand(rentee: Rentee): Observable<Rentee> {
    return this.http.put<Rentee>(this.urlProvider.serverUrl + '/leasingDemands/' + rentee.id, rentee);
  }

  deleteLeasingDemand(renteeId: number) {
    return this.http.delete<Rentee>(this.urlProvider.serverUrl + '/leasingDemands/' + renteeId);
  }

  acceptLeasingDemand(rentee: Rentee) {
    return this.http.post<Rentee>(this.urlProvider.serverUrl + '/leasingDemands/accept/', rentee);
  }

}
