import { Context } from 'koa'

const catchAsync =
  (fn: (ctx: Context) => Promise<void>) => async (ctx: Context) => {
    try {
      await fn(ctx)
    } catch (error) {
      console.error('Error:', error)
      ctx.status = 500
      ctx.body = { error: 'Internal server error' }
    }
  }

export default catchAsync
