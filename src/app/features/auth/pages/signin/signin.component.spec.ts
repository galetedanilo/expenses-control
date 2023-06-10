import { ComponentFixture, TestBed } from '@angular/core/testing';
import SigninComponent from './signin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ChangeDetectionStrategy } from '@angular/core';

describe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;
  let page: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SigninComponent, ReactiveFormsModule],
    })
      .overrideComponent(SigninComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;

    page = fixture.debugElement.nativeElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('give form', () => {
    it('whe email and password is empty, should disabled sign in button', () => {
      setEmail('');
      setPassword('');

      fixture.detectChanges();

      expect(recoverLogninButton().disabled).toBeTruthy();
    });

    it('whe email is invalid, should disabled sign in button', () => {
      setEmail('invalide email');
      setPassword('');

      fixture.detectChanges();

      expect(recoverLogninButton().disabled).toBeTruthy();
    });

    it('whe email is valid and passwor is empty, should disabled sign in button', () => {
      setEmail('valid@email.com');
      setPassword('');

      fixture.detectChanges();

      expect(recoverLogninButton().disabled).toBeTruthy();
    });

    it('whe email is valid and passwor is not empty, should enabled sign in button', () => {
      setEmail('valid@email.com');
      setPassword('password');

      fixture.detectChanges();

      expect(recoverLogninButton().disabled).toBeFalsy();
    });
  });

  function setEmail(email: string) {
    component.form.controls.email.setValue(email);
  }

  function setPassword(password: string) {
    component.form.controls.password.setValue(password);
  }

  function recoverLogninButton() {
    return page.querySelector('[test-id=signin-button]');
  }
});
