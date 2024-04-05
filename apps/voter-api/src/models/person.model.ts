import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/db.config'

interface PersonAttributes {
  id: number
  name: string
  voted: boolean
  votes: number
  type: 'candidate' | 'voter'
}

class Person extends Model<PersonAttributes> implements PersonAttributes {
  public id!: number
  public name!: string
  public voted = false
  public votes = 0
  public type!: 'candidate' | 'voter'
}

Person.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    voted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    votes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    type: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: 'Person',
  }
)

export default Person
