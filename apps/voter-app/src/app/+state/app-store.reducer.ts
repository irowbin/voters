import { createReducer, on, Action } from '@ngrx/store'
import * as AppStoreActions from './app-store.actions'
import { AppStoreState } from '../models'
import { getVoters } from '../api/get-voters'
import { getCandidates } from '../api/get-candidates'
import {
  addEntity,
  castVoteForCandidate,
} from '../utils/state-management.utils'

export const APP_STORE_FEATURE_KEY = 'appStore'

export interface AppStorePartialState {
  readonly [APP_STORE_FEATURE_KEY]: AppStoreState
}

export const initialAppStoreState: AppStoreState = {
  voters: getVoters(),
  candidates: getCandidates(),
  notifications: [],
}

const reducer = createReducer(
  initialAppStoreState,
  on(AppStoreActions.addVoter, (state, { voter }) =>
    addEntity(state, voter, 'voters', 'Voter')
  ),
  on(AppStoreActions.addCandidate, (state, { candidate }) =>
    addEntity(state, candidate, 'candidates', 'Candidate')
  ),
  on(AppStoreActions.submitVote, (state, { voterId, candidateId }) =>
    castVoteForCandidate(state, voterId, candidateId)
  ),
  on(AppStoreActions.removeNotification, (state, { message }) => ({
    ...state,
    notifications: state.notifications.filter(
      (notification) => notification.message !== message
    ),
  }))
)

export function appStoreReducer(
  state: AppStoreState | undefined,
  action: Action
) {
  return reducer(state, action)
}
