import { Injectable, inject } from '@angular/core'
import { Actions } from '@ngrx/effects'

@Injectable()
export class AppStoreEffects {
  private actions$ = inject(Actions)
}
