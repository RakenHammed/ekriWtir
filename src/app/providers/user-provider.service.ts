import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlProviderService } from './url-provider.service';
import { User } from 'app/models/user';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class UserProviderService {

  constructor(
    private http: HttpClient,
    private urlProvider: UrlProviderService,
  ) {
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.urlProvider.serverUrl + '/users/', user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(this.urlProvider.serverUrl + '/users/' + user.id, user);
  }

}

