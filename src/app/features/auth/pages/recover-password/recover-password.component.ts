import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AuthFacade } from '../../facades/auth.facade';

@Component({
  standalone: true,
  imports: [
    AsyncPipe,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    NgIf,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RecoverPasswordComponent {
  private _bd = inject(FormBuilder);
  private _facade = inject(AuthFacade);

  protected loading$ = this._facade.loading$

  form = this._bd.group({
    email: ['', [Validators.required, Validators.email]],
  });

  onSubmit(): void {
    this._facade.recoverPassword(this.form.controls.email.value as string);
  }
}
