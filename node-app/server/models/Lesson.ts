import { Schema } from 'mongoose'

export const LessonSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  hours: {
    type: Number,
    required: true,
  },
})
