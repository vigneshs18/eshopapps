import { Injectable } from '@angular/core';

// Mind the sequence order, otherwise will emit errors
const TOKEN = 'jwtToken';

@Injectable({
  providedIn: 'root'
})

export class LocalstorageService {

  constructor() { }

  setToken(data: string) {
    localStorage.setItem(TOKEN, data);
  }

  getToken(): string {
    return localStorage.getItem(TOKEN);
  }

  removeToken() {
    localStorage.removeItem(TOKEN);
  }

}
