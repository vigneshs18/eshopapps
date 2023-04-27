import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { LocalstorageService } from './localstorage.service';

export const AuthGaurd: CanActivateFn = () => {
  const router = inject(Router);
  const localStorage = inject(LocalstorageService);

  const token = localStorage.getToken();

  if (token) {
    const tokenDecode = JSON.parse(atob(token.split('.')[1]));
    // console.log(tokenDecode);

    const currentTime = Math.floor(new Date().getTime() / 1000);
    // console.log(currentTime);

    const tokenExpired = (currentTime >= tokenDecode.iat && currentTime <= tokenDecode.exp) ? true : false;
    // console.log(tokenExpired);

    if (tokenDecode.isAdmin && tokenExpired) {
      return true;
    }
  }

  router.navigate(['/login']);
  return false;

};
