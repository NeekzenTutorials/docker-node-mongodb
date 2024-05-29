import { Teacher } from '~/server/models/Teacher'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const id = event.context.params!.id

    await Teacher.findByIdAndUpdate(id, body)

    return { message: 'Teacher updated' }
  } catch (e) {
    if (e instanceof Error) {
      throw createError({ message: e.message, status: 400 })
    }
  }
})
