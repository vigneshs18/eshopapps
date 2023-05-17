import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; 

import { User } from '../models/user';
import { environment } from '@env/environment';

import * as CountryLib from 'i18n-iso-countries';
import { UsersFacade } from '../state/users.facade';
declare const require: any;

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  apiUrlUsers = environment.apiUrl + 'users';

  constructor(private http: HttpClient, private usersFacade: UsersFacade) {
    CountryLib.registerLocale(require("i18n-iso-countries/langs/en.json"));
  }

  initAppSession() {
    this.usersFacade.buildUserSession();
  }

  observeCurrentUser() {
    return this.usersFacade.currentUser$;
  }

  isCurrentUserAuth() {
    return this.usersFacade.isAuthenticated$;
  }

  getCountries(): { id: string; name: string }[] {
    return Object.entries(CountryLib.getNames("en", {select: "official"})).map(
      (entry) => {
        return {
          id: entry[0],
          name: entry[1]
        }
      }
    );
  }

  getCountry(countryKey: string): string {
    return CountryLib.getName(countryKey, 'en');
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrlUsers}`);
  }

  getUser(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrlUsers}/${userId}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrlUsers}`, user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrlUsers}/${user.id}`, user);
  }

  deleteUser(userId: string): Observable<object> {
    return this.http.delete<object>(`${this.apiUrlUsers}/${userId}`);
  }

  getUserCount(): Observable<number> {
    return this.http
      .get<number>(`${this.apiUrlUsers}/get/count`)
      .pipe(map(
        (objectValue: any) => objectValue.userCount
      ));
  }

}
