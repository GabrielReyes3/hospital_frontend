import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { jwtDecode } from 'jwt-decode';

export const roleGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);

  const token = localStorage.getItem('access_token');
  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  try {
    const decoded: any = jwtDecode(token);
    const userRole = decoded.tipo; // Asegúrate de que el token incluya el campo 'tipo'
    const allowedRoles = route.data['allowed'] as string[];

    if (allowedRoles.includes(userRole)) {
      return true;
    } else {
      alert('Acceso no autorizado.');
      router.navigate(['/login']);
      return false;
    }
  } catch (err) {
    router.navigate(['/login']);
    return false;
  }
};
