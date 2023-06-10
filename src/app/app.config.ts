import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { initializeApp, provideFirebaseApp} from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

import { APP_ROUTES } from './app.routes';
import { environment } from 'src/environments/environment';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(APP_ROUTES), provideAnimations(), importProvidersFrom(
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth())
  )],
};
