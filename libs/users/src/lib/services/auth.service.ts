import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { User } from '../models/user';
import { environment } from '@env/environment';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  apiUrlUsers = environment.apiUrl + 'users';

  constructor(
    private http: HttpClient,
    private router: Router,
    private localstorageService: LocalstorageService
  ) { }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrlUsers}/login`, { email, password });
  }

  logout() {
    this.localstorageService.removeToken();
    this.router.navigate(['/login']);
  }

}
