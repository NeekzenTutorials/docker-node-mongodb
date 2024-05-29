import { Teacher } from '~/server/models/Teacher'

export default defineEventHandler(async (event) => {
  try {
    const teacher = await Teacher.findById({ _id: event.context.params!.id })
    setResponseStatus(event, 200, 'Teacher found')
    return { teacher }
  } catch (e) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong.',
    })
  }
})
