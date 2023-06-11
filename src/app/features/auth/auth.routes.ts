import { Routes } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { AuthenticationFacade } from './facades/authentication.facade';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBar } from '@angular/material/snack-bar';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./auth.component'),
    providers: [
      AuthenticationService,
      AuthenticationFacade,
      MatSnackBar,
      {
        provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
        useValue: {
          verticalPosition: 'top',
          horizontalPosition: 'end',
          duration: 2500,
        },
      },
    ],
    children: [
      { path: '', redirectTo: 'signin', pathMatch: 'full' },
      {
        path: 'signin',
        loadComponent: () => import('./pages/signin/signin.component'),
      },
    ],
  },
];
