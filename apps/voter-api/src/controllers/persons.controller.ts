import { Context } from 'koa'
import {
  request,
  summary,
  tagsAll,
  body,
  responses,
} from 'koa-swagger-decorator'
import { createPerson, findAllPersons, updatePerson } from './persons.service'

@tagsAll(['Person'])
export default class PersonController {
  @request('get', '/persons')
  @summary('List all persons')
  @responses({
    200: { description: 'Success' },
    500: { description: 'Internal server error' },
  })
  static async getAll(ctx: Context): Promise<void> {
    ctx.body = await findAllPersons()
  }

  @request('post', '/persons')
  @summary('Create a new person')
  @body({
    name: { type: 'string', required: true, example: 'John Doe' },
    type: { type: 'string', required: true, example: 'voter' },
    // Define other properties...
  })
  static async create(ctx: Context): Promise<void> {
    const newPerson = await createPerson(ctx.request.body)
    ctx.status = 201
    ctx.body = newPerson
  }

  @request('put', '/persons/{id}')
  @summary('Update a person')
  @body({
    name: { type: 'string', required: true, example: 'Jane Doe' },
    // Define other properties to update...
  })
  static async update(ctx: Context): Promise<void> {
    const { id } = ctx.params
    const person = await updatePerson(id, ctx.request.body)

    if (person) {
      ctx.body = person
    } else {
      ctx.status = 404
      ctx.body = { error: 'Person not found' }
    }
  }
}
