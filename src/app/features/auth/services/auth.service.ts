import { Injectable, inject } from '@angular/core';
import {
  Auth,
  UserCredential,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';

import { Observable, from } from 'rxjs';

@Injectable()
export class AuthService {
  private _auth: Auth = inject(Auth);

  signUp(email: string, password: string): Observable<UserCredential> {
    return from(createUserWithEmailAndPassword(this._auth, email, password));
  }

  signIn(email: string, password: string): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(this._auth, email, password));
  }

  recoverPassword(email: string): Observable<void> {
    return from(sendPasswordResetEmail(this._auth, email));
  }
}
