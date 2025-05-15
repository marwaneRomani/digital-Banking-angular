import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthenticated$.pipe(
    map((isAuthenticated) => {
      if (isAuthenticated) {
        return true;
      } else {
        router.navigate(['/login']);
        return false;
      }
    })
  );
};

export const agentGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.userRole$.pipe(
    map((role) => {
      if (role === 'AGENT') {
        return true;
      } else {
        router.navigate(['/unauthorized']);
        return false;
      }
    })
  );
};

export const clientGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.userRole$.pipe(
    map((role) => {
      if (role === 'CLIENT') {
        return true;
      } else {
        router.navigate(['/unauthorized']);
        return false;
      }
    })
  );
};
