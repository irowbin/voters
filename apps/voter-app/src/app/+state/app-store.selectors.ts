import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store'
import { APP_STORE_FEATURE_KEY } from './app-store.reducer'
import { AppStoreState } from '../models'

export const selectAppStoreState = createFeatureSelector<AppStoreState>(
  APP_STORE_FEATURE_KEY
)

export const getStateFromAppStore = <T extends keyof AppStoreState>(
  stateKey: T
): MemoizedSelector<object, AppStoreState[T], unknown> =>
  createSelector(selectAppStoreState, (state: AppStoreState) => state[stateKey])

export const selectTotalVotes = createSelector(selectAppStoreState, (state) =>
  state.candidates.reduce(
    (total, candidate) => total + (candidate.votes || 0),
    0
  )
)

export const selectCurrentWinning = createSelector(
  selectAppStoreState, // Assuming selectAppStoreState correctly selects the relevant part of the state
  (state) => {
    if (state.candidates.length === 0) {
      return null
    }

    const highestVoteCount = Math.max(
      ...state.candidates.map((c) => c.votes || 0)
    )
    const candidatesWithHighestVote = state.candidates.filter(
      (c) => c.votes === highestVoteCount
    )

    // If all candidates have the same number of votes (and it's not 0) or no votes, return 0 to indicate a tie
    // Adjust according to whether you wish to treat all 0 votes as a tie or no contest
    if (
      candidatesWithHighestVote.length === state.candidates.length ||
      highestVoteCount === 0
    ) {
      return null
    }

    // Assuming a tie is not considered a valid winning condition unless you want to handle it differently
    if (candidatesWithHighestVote.length > 1) {
      return null
    }

    // If we have a clear winner
    return candidatesWithHighestVote[0]
  }
)

export const selectCompetingCandidates = createSelector(
  selectAppStoreState,
  selectCurrentWinning,
  (state, winner) => {
    return state.candidates.filter(
      (candidate) => winner?.id !== candidate.id && candidate.votes > 0
    )
  }
)
