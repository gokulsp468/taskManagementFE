import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // Check if the user is authenticated (e.g., access token exists)
  const isAuthenticated = !!localStorage.getItem('accessToken');

  if (!isAuthenticated) {
    console.log('User is not authenticated, redirecting to /auth/login');
    router.navigate(['/auth/login']);
    return false; // Block access
  }

  return true; // Allow access
};
