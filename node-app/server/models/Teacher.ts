import { Schema, model } from 'mongoose'
import type { ITeacher } from '~/types'
import { ResourceSchema } from './Resource'

const TeacherSchema = new Schema<ITeacher>(
  {
    firstname: {
      type: String,
      required: true,
      trim: true,
    },

    lastname: {
      type: String,
      required: true,
      trim: true,
    },

    resources: [ResourceSchema],
  },
  { timestamps: true }
)

export const Teacher = model<ITeacher>('Teacher', TeacherSchema)
