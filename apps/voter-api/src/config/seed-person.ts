import sequelize from './db.config'
import Person from '../models/person.model'

const seedPerson = async () => {
  await sequelize.sync({ force: true })

  const personCount = await Person.count()

  if (personCount === 0) {
    const seedData = [
      { name: 'Alice Johnson', type: 'candidate', voted: false, votes: 0 },
      { name: 'Bob Smith', type: 'candidate', voted: false, votes: 0 },
      { name: 'Charlie Daniels', type: 'candidate', voted: false, votes: 0 },
      { name: 'Diana Hayden', type: 'candidate', voted: false, votes: 0 },
      { name: 'Ethan Ray', type: 'candidate', voted: false, votes: 0 },
      { name: 'Fiona Graham', type: 'voter', voted: false, votes: 0 },
      { name: 'George Martin', type: 'voter', voted: false, votes: 0 },
      { name: 'Hannah Klein', type: 'voter', voted: false, votes: 0 },
      { name: 'Ian Douglas', type: 'voter', voted: false, votes: 0 },
      { name: 'Julia Roberts', type: 'voter', voted: false, votes: 0 },
    ] as Person[]

    await Person.bulkCreate(seedData)
    console.log('Database seeded!')
  }
}

export const seedInitialPerson = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
    await seedPerson() // Make sure to await this function
  } catch (err) {
    console.error('Unable to connect to the database:', err)
  }
}
