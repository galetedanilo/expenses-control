import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

import { BehaviorSubject, Observable, finalize, first } from 'rxjs';

import { AUTH_ERRORS } from '../enums/auth.enums';
import { SignUp, SignIn } from '../interfaces/auth.interface';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthFacade {
  private _service: AuthService = inject(AuthService);
  private _snackBar: MatSnackBar = inject(MatSnackBar);
  private _router: Router = inject(Router);

  private loading = new BehaviorSubject<boolean>(false);

  get loading$(): Observable<boolean> {
    return this.loading.asObservable();
  }

  signUp(data: SignUp): void {
    this._service
      .signUp(data.email, data.password)
      .pipe(first())
      .subscribe({
        next: (user) => {
          this._router.navigate(['/home']);
        },
        error: (reason) => {
          this.handleError(reason.code);
        },
      });
  }

  signIn(data: SignIn): void {
    this.loading.next(true);

    this._service
      .signIn(data.email, data.password)
      .pipe(
        first(),
        finalize(() => this.loading.next(false))
      )
      .subscribe({
        next: (user) => {
          this._router.navigate(['/home']);
        },
        error: (reason) => {
          this.handleError(reason.code);
        },
      });
  }

  recoverPassword(email: string): void {
    this.loading.next(true);

    this._service
      .recoverPassword(email)
      .pipe(
        first(),
        finalize(() => this.loading.next(false))
      )
      .subscribe({
        next: (_) => {
          this.showSnackBar(
            $localize`Check your email for a link to reset your password. If it doesn't appear within a few minutes, check your spam folder.`
          );
          this._router.navigate(['/auth']);
        },
        error: (reason) => {
          this.handleError(reason.code);
        },
      });
  }

  private handleError(error: AUTH_ERRORS): void {
    switch (error) {
      case AUTH_ERRORS.USER_NOT_FOUND:
        this.showSnackBar($localize`User not found`);
        break;

      case AUTH_ERRORS.WRONG_PASSWORD:
        this.showSnackBar($localize`Wrong password`);
        break;
    }
  }

  private showSnackBar(message: string): void {
    this._snackBar.open(message, $localize`Close`);
  }
}
