import Person from '../models/person.model'

export const findAllPersons = async () => {
  return await Person.findAll()
}

export const createPerson = async (personData: any) => {
  return await Person.create(personData)
}

export const updatePerson = async (id: string, personData: any) => {
  const [updated] = await Person.update(personData, {
    where: { id: id },
  })
  if (updated) {
    return await Person.findOne({ where: { id: id } })
  }
  return null
}
