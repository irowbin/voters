import { Person } from '../models'
import { uuidV4 } from '../utils/uuid.utils'

// Assume we fetch this from an API such as nodejs server or firebase

export const getCandidates = (): Person[] => [
  { id: uuidV4(), name: 'Luna Jennings', votes: 0, voted: false },
  { id: uuidV4(), name: 'Talia Oakley', votes: 0, voted: false },
  { id: uuidV4(), name: 'Ivan Adler', votes: 0, voted: false },
  { id: uuidV4(), name: 'Orion Granger', votes: 0, voted: false },
  { id: uuidV4(), name: 'Emmett Jennings', votes: 0, voted: false },
  { id: uuidV4(), name: 'Phoebe Pierce', votes: 0, voted: false },
  { id: uuidV4(), name: 'Orion Dunn', votes: 0, voted: false },
  { id: uuidV4(), name: 'Orion Thorne', votes: 0, voted: false },
  { id: uuidV4(), name: 'Rosalie Jennings', votes: 0, voted: false },
  { id: uuidV4(), name: 'Aiden Ellsworth', votes: 0, voted: false },
]
