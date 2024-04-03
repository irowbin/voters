import { ApplicationConfig, isDevMode } from '@angular/core'
import { provideRouter } from '@angular/router'
import { appRoutes } from './app.routes'
import { provideStore, provideState } from '@ngrx/store'
import { provideEffects } from '@ngrx/effects'
import { provideStoreDevtools } from '@ngrx/store-devtools'

import * as fromAppStore from './+state/app-store.reducer'
import { AppStoreEffects } from './+state/app-store.effects'
import { AppStoreFacade } from './+state/app-store.facade'
import { provideAnimations } from '@angular/platform-browser/animations'

export const appConfig: ApplicationConfig = {
  providers: [
    provideEffects(AppStoreEffects),
    provideState(
      fromAppStore.APP_STORE_FEATURE_KEY,
      fromAppStore.appStoreReducer
    ),
    AppStoreFacade,
    provideStoreDevtools({ logOnly: !isDevMode(), maxAge: 25 }),
    provideEffects(),
    provideStore(),
    provideRouter(appRoutes),
    provideAnimations(),
  ],
}
