function sendResponse(ctx, data, statusCode = 200) {
  ctx.status = statusCode
  ctx.body = data
}

function sendError(ctx, message, statusCode = 500) {
  console.error(message)
  ctx.status = statusCode
  ctx.body = { error: message }
}

export { sendResponse, sendError }
