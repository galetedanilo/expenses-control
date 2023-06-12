import { ComponentFixture, TestBed } from '@angular/core/testing';
import SigninComponent from './signin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ChangeDetectionStrategy, NO_ERRORS_SCHEMA } from '@angular/core';
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BlanckComponent } from '../../../../shared/mockes/blanck/blanck.component';
import { AuthenticationFacade } from '../../facades/authentication.facade';
import { of } from 'rxjs';

describe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;
  let page: any;
  let location: Location;

  let authenticationFacadeSpy: AuthenticationFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SigninComponent,
        ReactiveFormsModule,
        NoopAnimationsModule,
        RouterTestingModule.withRoutes([
          { path: 'home', component: BlanckComponent },
        ]),
      ],
      providers: [
        { provide: AuthenticationFacade, useValue: AuthenticationFacade },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .overrideComponent(SigninComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninComponent);
    
    authenticationFacadeSpy = TestBed.inject(
      AuthenticationFacade
    ) as jest.Mocked<AuthenticationFacade>;
    location = TestBed.inject(Location);

    component = fixture.componentInstance;

    page = fixture.debugElement.nativeElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('give form', () => {
    it('when email and password is empty, should disabled sign in button', () => {
      setEmail('');
      setPassword('');

      fixture.detectChanges();

      expect(getLoginButton().disabled).toBeTruthy();
    });

    it('when email is invalid, should disabled sign in button', () => {
      setEmail('invalide email');
      setPassword('');

      fixture.detectChanges();

      expect(getLoginButton().disabled).toBeTruthy();
    });

    it('when email is valid and passwor is empty, should disabled sign in button', () => {
      setEmail('valid@email.com');
      setPassword('');

      fixture.detectChanges();

      expect(getLoginButton().disabled).toBeTruthy();
    });

    it('when email is valid and passwor is not empty, should enabled sign in button', () => {
      setEmail('valid@email.com');
      setPassword('password');

      fixture.detectChanges();

      expect(getLoginButton().disabled).toBeFalsy();
    });
  });

  describe('login flow', () => {
    describe('when user click in login button', () => {
      beforeEach(() => {
        authenticationFacadeSpy.signIn = jest.fn().mockImplementation();

        setEmail('valid@email.com');
        setPassword('password');
        getLoginButton().click();

        component.isLoading = of(true);

        fixture.detectChanges();

        expect(authenticationFacadeSpy.signIn).toBeCalled();
      });

      it('should hide loggin button', () => {
        expect(getLoginButton()).toBeNull();
      });

      it('should show login loader button', () => {
        expect(getLoginLoaderButton()).not.toBeNull();
      });

      describe('when login successful', () => {
        beforeEach(() => {
          location.go('/home')
        });

        it('then go to home page', (done) => {
          setTimeout(() => {
            expect(location.path()).toEqual('/home');
            done();
          }, 100);
        });
      });

      describe('when login fails', () => {
        beforeEach(() => {
          component.isLoading = of(false);

          fixture.detectChanges();
        });

        it('then do not go to home page', (done) => {
          setTimeout(() => {
            expect(location.path()).not.toEqual('/home');
            done();
          }, 100);
        });

        it('should show loggin button', () => {
          expect(getLoginButton()).not.toBeNull();
        });

        it('should hide login loader button', () => {
          expect(getLoginLoaderButton()).toBeNull();
        });
      });
    });
  });

  function setEmail(email: string) {
    component.form.controls.email.setValue(email);
    fixture.detectChanges();
  }

  function setPassword(password: string) {
    component.form.controls.password.setValue(password);
    fixture.detectChanges();
  }

  function getLoginButton(): HTMLButtonElement {
    return page.querySelector('[test-id=signin-button]');
  }

  function getLoginLoaderButton(): HTMLButtonElement {
    return page.querySelector('[test-id=loading-button]');
  }
  
});
