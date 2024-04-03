import { createAction, props } from '@ngrx/store'
import { Person } from '../models'

enum AppStoreActionTypes {
  // Actions for adding a voter, candidate, and submitting a vote
  AddVoter = '[Voter] Add Voter',
  AddCandidate = '[Candidate] Add Candidate',
  SubmitVote = '[Vote] Submit Vote',

  // Actions for removing a notification
  RemoveNotification = '[Notification] Remove Notification',
}

export const addVoter = createAction(
  AppStoreActionTypes.AddVoter,
  props<{ voter: Person }>()
)

export const addCandidate = createAction(
  AppStoreActionTypes.AddCandidate,
  props<{ candidate: Person }>()
)

export const submitVote = createAction(
  AppStoreActionTypes.SubmitVote,
  props<{ voterId: string; candidateId: string }>()
)

export const removeNotification = createAction(
  AppStoreActionTypes.RemoveNotification,
  props<{ message: string }>()
)
