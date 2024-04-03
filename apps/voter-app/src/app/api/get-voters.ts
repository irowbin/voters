import { Person } from '../models'
import { uuidV4 } from '../utils/uuid.utils'

// Assume we fetch this from an API such as nodejs server or firebase

export const getVoters = (): Person[] => [
  { id: uuidV4(), name: 'Quentin Carmichael', votes: 0, voted: false },
  { id: uuidV4(), name: 'Luna Redford', votes: 0, voted: false },
  { id: uuidV4(), name: 'Orion Redford', votes: 0, voted: false },
  { id: uuidV4(), name: 'Gideon Adler', votes: 0, voted: false },
  { id: uuidV4(), name: 'Quentin Sullivan', votes: 0, voted: false },
  { id: uuidV4(), name: 'Gideon Morrow', votes: 0, voted: false },
  { id: uuidV4(), name: 'Helena Knight', votes: 0, voted: false },
  { id: uuidV4(), name: 'Miles Irwin', votes: 0, voted: false },
  { id: uuidV4(), name: 'Miles North', votes: 0, voted: false },
  { id: uuidV4(), name: 'Brielle Blackwood', votes: 0, voted: false },
]
