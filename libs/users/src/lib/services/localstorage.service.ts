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

  isValidToken() {
    const token = this.getToken();
    if (token) {
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      if (tokenDecode) {
        const currentTime = Math.floor(new Date().getTime() / 1000);
        const tokenExpired = (currentTime >= tokenDecode.iat && currentTime <= tokenDecode.exp) ? false : true;
        return !tokenExpired;
      }
      else {
        return false;
      }
    }
    else {
      return false;
    }
  }

  getUserIdFromToken() {
    const token = this.getToken();
    if (token) {
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      if (tokenDecode) {
        return tokenDecode.userId;
      }
      else {
        return null;
      }
    }
    else {
      return null;
    }
  }

}
