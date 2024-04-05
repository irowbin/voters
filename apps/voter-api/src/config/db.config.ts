import { Sequelize } from 'sequelize'
import path from 'path'

// The file is located at `dist/apps/voter-api/apps/voter-api/src/database`
const storage = path.resolve(__dirname, '../database/database.sqlite')

const sequelize = new Sequelize('database', 'demo', 'demo', {
  host: '0.0.0.0',
  dialect: 'sqlite',
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
  storage,
})

export default sequelize
