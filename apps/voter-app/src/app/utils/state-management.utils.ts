import { AppNotification, AppStoreState, Person } from '../models'
import { uuidV4 } from './uuid.utils'

/**
 * Adds a new notification to the state.
 * @param {AppStoreState} state - The current state of the app store.
 * @param {string} message - The message for the notification.
 * @param {'error' | 'info'} [type='info'] - The type of the notification, defaults to 'info'.
 * @returns {AppStoreState} A new state with the added notification.
 */
export const addNotification = (
  state: AppStoreState,
  message: string,
  type: 'error' | 'info' = 'info'
): AppStoreState => {
  return {
    ...state,
    notifications: [
      ...state.notifications,
      { message, hideAfter: 5000, type } as AppNotification,
    ],
  }
}

/**
 * Adds a new entity (voter or candidate) if it does not already exist.
 * @param {AppStoreState} state - The current state of the app store.
 * @param {Person} entity - The entity to add (voter or candidate).
 * @param {'voters' | 'candidates'} entityList - The list to which the entity belongs.
 * @param {string} entityName - The name of the entity being added.
 * @returns {AppStoreState} A new state with the added entity or a notification if the entity already exists.
 */
export const addEntity = (
  state: AppStoreState,
  entity: Person,
  entityList: 'voters' | 'candidates',
  entityName: string
): AppStoreState => {
  const isEntityExists = state[entityList].some(
    (e) => e.name.trim().toLowerCase() === entity.name.trim().toLowerCase()
  )

  if (isEntityExists) {
    return addNotification(
      state,
      `${entityName} ${entity.name} already exists`,
      'error'
    )
  }

  const newEntity = { ...entity, id: uuidV4() }
  if (entityList === 'voters') {
    newEntity['voted'] = false // Specific to voters
  }

  return {
    ...state,
    [entityList]: [newEntity, ...state[entityList]],
    notifications: [
      ...state.notifications,
      {
        message: `${entityName} ${entity.name} added`,
        hideAfter: 5000,
      } as AppNotification,
    ],
  }
}
/**
 * Updates the voting status of a voter and increments the vote count of a candidate.
 * @param {AppStoreState} state - The current state of the app store.
 * @param {string} voterId - The ID of the voter.
 * @param {string} candidateId - The ID of the candidate.
 * @returns {AppStoreState} A new state with updated voter and candidate information.
 */
export const castVoteForCandidate = (
  state: AppStoreState,
  voterId: string,
  candidateId: string
): AppStoreState => {
  const voterToUpdate = state.voters.find((voter) => voter.id === voterId)
  const candidateToUpdate = state.candidates.find(
    (candidate) => candidate.id === candidateId
  )

  if (!voterToUpdate || !candidateToUpdate) {
    return {
      ...state,
      notifications: [
        ...state.notifications,
        {
          message: 'Voter or candidate not found',
          hideAfter: 5000,
          type: 'error',
        } as AppNotification,
      ],
    }
  }

  return {
    ...state,
    voters: state.voters.map((voter) =>
      voter.id === voterId ? { ...voter, voted: true } : voter
    ),
    candidates: state.candidates.map((candidate) =>
      candidate.id === candidateId
        ? {
            ...candidate,
            votes: (candidate.votes || 0) + 1,
          }
        : candidate
    ),
    notifications: [
      ...state.notifications,
      {
        message: `${voterToUpdate.name} voted for ${candidateToUpdate.name}`,
        hideAfter: 5000,
      } as AppNotification,
    ],
  }
}
