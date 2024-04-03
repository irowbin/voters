import { Injectable, inject } from '@angular/core'
import { select, Store } from '@ngrx/store'

import * as AppStoreActions from './app-store.actions'
import * as AppStoreSelectors from './app-store.selectors'
import { Person } from '../models'

@Injectable()
export class AppStoreFacade {
  private readonly store = inject(Store)

  public selectVoter$ = this.store.pipe(
    select(AppStoreSelectors.getStateFromAppStore('voters'))
  )

  public selectCandidate$ = this.store.pipe(
    select(AppStoreSelectors.getStateFromAppStore('candidates'))
  )

  public selectNotification$ = this.store.pipe(
    select(AppStoreSelectors.getStateFromAppStore('notifications'))
  )

  public addVoter(voter: Person): void {
    this.store.dispatch(AppStoreActions.addVoter({ voter }))
  }

  public addCandidate(candidate: Person): void {
    this.store.dispatch(AppStoreActions.addCandidate({ candidate }))
  }

  public submitVote(voterId: string, candidateId: string): void {
    this.store.dispatch(AppStoreActions.submitVote({ voterId, candidateId }))
  }
  public removeNotification(message: string): void {
    this.store.dispatch(AppStoreActions.removeNotification({ message }))
  }
}
