import { Renter } from './../models/user';
import { UrlProviderService } from './url-provider.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Car } from './../models/car';

@Injectable({
  providedIn: 'root'
})
export class RentingProviderService {

  constructor(
    private http: HttpClient,
    private urlProvider: UrlProviderService,
  ) {
  }

  createRentingDemand(car: Car, privateKey: string): Observable<Renter> {
    const params = {
      car: car,
      privateKey: privateKey,
    }
    return this.http.post<Renter>(this.urlProvider.serverUrl + '/rentingDemands/', params);
  }

  getRentingDemands(): Observable<Renter[]> {
    return this.http.get<Renter[]>(this.urlProvider.serverUrl + '/rentingDemands/');
  }

  updateRentingDemand(renter: Renter): Observable<Renter> {
    return this.http.put<Renter>(this.urlProvider.serverUrl + '/rentingDemands/' + renter.id, renter);
  }

  deleteRentingDemand(renterId: number) {
    return this.http.delete<Renter>(this.urlProvider.serverUrl + '/rentingDemands/' + renterId);
  }

  acceptRentingDemand(renter: Renter) {
    return this.http.post<Renter>(this.urlProvider.serverUrl + '/rentingDemands/accept/', renter);
  }

  getAvailableCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.urlProvider.serverUrl + '/rentingDemands/availableCars/');
  }

}
