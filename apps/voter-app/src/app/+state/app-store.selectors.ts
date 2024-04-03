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
