import { Teacher } from '~/server/models/Teacher'

export default defineEventHandler(async () => {
  try {
    const teachers = await Teacher.find().sort('lastname')

    teachers.forEach((teacher) => {
      teacher.resources.sort((a, b) => a.name.localeCompare(b.name))

      teacher.resources.forEach((resource) => {
        resource.lessons.sort((a, b) => a.name.localeCompare(b.name))
      })
    })

    return { teachers }
  } catch (error: unknown) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong.',
    })
  }
})
