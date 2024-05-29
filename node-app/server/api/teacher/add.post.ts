import { Teacher } from '~/server/models/Teacher'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    if (!body.firstname || !body.lastname) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Mauvaise requête',
        message: 'Champs obligatoires manquants',
      })
    }

    await Teacher.create(body)
    setResponseStatus(event, 201, 'Teacher Created')
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw createError({ statusCode: 400, statusMessage: error.message })
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong.',
    })
  }
})
