import { Location } from '@angular/common';
import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import RecoverPasswordComponent from './recover-password.component';

import { BlanckComponent } from '../../../../shared/mockes/blanck/blanck.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import {
  getHtmlElement,
  setHtmlInputElement,
} from 'src/app/shared/helpers/testing.helper';
import { AuthFacade } from '../../facades/auth.facade';
import { of } from 'rxjs';

describe('RecoverPasswordComponent', () => {
  let component: RecoverPasswordComponent;
  let fixture: ComponentFixture<RecoverPasswordComponent>;

  let facade: jest.Mocked<AuthFacade>;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RecoverPasswordComponent,
        NoopAnimationsModule,
        RouterTestingModule.withRoutes([
          { path: 'auth/signin', component: BlanckComponent },
        ]),
      ],
      providers: [{ provide: AuthFacade, useValue: AuthFacade }],
    })
      .overrideComponent(RecoverPasswordComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoverPasswordComponent);
    component = fixture.componentInstance;

    facade = TestBed.inject(AuthFacade) as jest.Mocked<AuthFacade>;
    location = TestBed.inject(Location);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('given form', () => {
    it('when email is empty, should disabled reset button', () => {
      setHtmlInputElement(fixture, 'input-email', '');

      fixture.detectChanges();

      expect(getHtmlElement(fixture, 'button-reset').disabled).toBeTruthy();
    });

    it('when email is invalid, should disabled reset button', () => {
      setHtmlInputElement(fixture, 'input-email', 'invalid_email');

      fixture.detectChanges();

      expect(getHtmlElement(fixture, 'button-reset').disabled).toBeTruthy();
    });

    it('when email is valid, should enabled reset button', () => {
      setHtmlInputElement(fixture, 'input-email', 'valide@email.com');

      fixture.detectChanges();

      expect(getHtmlElement(fixture, 'button-reset').disabled).toBeFalsy();
    });
  });

  describe('recover flow', () => {
    describe('when user click in reset button', () => {
      beforeEach(() => {
        facade.recoverPassword = jest.fn().mockImplementation();

        setHtmlInputElement(fixture, 'input-email', 'valide@email.com');

        fixture.detectChanges();

        const button = getHtmlElement(
          fixture,
          'button-reset'
        ) as HTMLButtonElement;
        button.click();

        component['loading$'] = of(true);

        fixture.detectChanges();

        expect(facade.recoverPassword).toBeCalled();
      });

      it('should hide reset button', () => {
        expect(getHtmlElement(fixture, 'button-reset')).not.toBeTruthy();
      });

      it('should show loading button', () => {
        expect(getHtmlElement(fixture, 'button-loading')).toBeTruthy();
      });

      describe('when recover success', () => {
        beforeEach(() => {
          location.go('/auth/signin');
        });

        it('should go to auth', () => {
          expect(location.path()).toEqual('/auth/signin')
        });
      });

      describe('when recover fail', () => {
        beforeEach(() => {
          component['loading$'] = of(false);

          fixture.detectChanges();
        });

        it('should show recover button', () => {
          expect(getHtmlElement(fixture, 'button-reset')).toBeTruthy();
        });

        it('should hide loading button', () => {
          expect(getHtmlElement(fixture, 'button-loading')).not.toBeTruthy();
        });
      });
    });
  });
});
