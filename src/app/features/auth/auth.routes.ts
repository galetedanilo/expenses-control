import { Routes } from '@angular/router';
import { AuthService } from './services/auth.service';
import { AuthFacade } from './facades/auth.facade';
import {
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatSnackBar,
} from '@angular/material/snack-bar';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./auth.component'),
    providers: [
      AuthService,
      AuthFacade,
      MatSnackBar,
      {
        provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
        useValue: {
          verticalPosition: 'top',
          horizontalPosition: 'end',
        },
      },
    ],
    children: [
      { path: '', redirectTo: 'signin', pathMatch: 'full' },
      {
        path: 'signin',
        loadComponent: () => import('./pages/signin/signin.component'),
      },
      {
        path: 'recover-password',
        loadComponent: () =>
          import('./pages/recover-password/recover-password.component'),
      },
    ],
  },
];
