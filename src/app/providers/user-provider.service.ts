import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
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
  getUsers(): Observable<User[]> {
    const token: string = localStorage.getItem('token');
    const options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token),
    }
    return this.http.get<User[]>(this.urlProvider.serverUrl + '/users/', options);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.urlProvider.serverUrl + '/users/', user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(this.urlProvider.serverUrl + '/users/' + user.id, user);
  }

  deleteUser(userId: number) {
    const token: string = localStorage.getItem('token');
    const options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token),
    }
    return this.http.delete<User>(this.urlProvider.serverUrl + '/users/' + userId, options);
  }

}

