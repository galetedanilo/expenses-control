import { Injectable, inject } from '@angular/core';
import { SignIn } from '../interfaces/signin.interface';
import { BehaviorSubject, Observable, finalize, first } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';
import { AUTH_ERRORS } from '../enums/auth.enums';

@Injectable()
export class AuthenticationFacade {
  private service = inject(AuthenticationService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  private loading = new BehaviorSubject<boolean>(false);

  get loading$(): Observable<boolean> {
    return this.loading.asObservable();
  }

  signIn(data: SignIn): void {
    this.loading.next(true);
    this.service
      .signIn(data.email, data.password)
      .pipe(
        first(),
        finalize(() => this.loading.next(false))
      )
      .subscribe({
        next: (data) => {
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.handleError(err.code)
        },
      });
  }

  private handleError(error: AUTH_ERRORS): void {
    switch (error) {
      case AUTH_ERRORS.USER_DELETED:
      case AUTH_ERRORS.INVALID_PASSWORD:
        this.showSnackBar($localize`Invalid username or password`);
        break;
    }
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, $localize`Close`);
  }
}
