import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authPagesGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // Check if the user is already authenticated
  const isAuthenticated = !!localStorage.getItem('accessToken');

  if (isAuthenticated) {
    console.log('User is already logged in, redirecting to /projects');
    router.navigate(['/projects']); // Redirect logged-in users
    return false; // Block access to login/register
  }

  return true; // Allow access for non-authenticated users
};
