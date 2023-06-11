import { Injectable, inject } from '@angular/core';
import { Observable, from } from 'rxjs';
import {
  Auth,
  UserCredential,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';

@Injectable()
export class AuthenticationService {
  private auth = inject(Auth);

  signIn(email: string, password: string): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }
}
