import { CanActivateFn } from '@angular/router';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  if (userService.isUserLoggedIn()) {
    return true; // User is logged in, allow access
  } else {
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false; // User is not logged in, redirect to login
  }
};