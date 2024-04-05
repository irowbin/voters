import Koa from 'koa'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'
import { seedInitialPerson } from './config/seed-person'
import { SwaggerRouter } from 'koa-swagger-decorator'

const router = new SwaggerRouter()

router.prefix('/api/v1')

const host = process.env.HOST ?? 'localhost'
const port = process.env.PORT ? Number(process.env.PORT) : 3000

const app = new Koa()

async function initializeApp() {
  await seedInitialPerson()

  app.use(bodyParser())

  // Apply middleware
  app.use(bodyParser())
  app.use(cors())

  // Swagger configuration
  router.swagger({
    title: 'Voter API',
    description: 'API documentation for Voter API',
    version: '1.0.0',
  })
  router.mapDir(__dirname + '/controllers')

  app.use(router.routes()).use(router.allowedMethods())

  app.listen(port, host, () => {
    console.log(`[ ready ] http://${host}:${port}`)
  })
}

initializeApp().catch((err) => {
  console.error('Failed to initialize the app:', err)
})
