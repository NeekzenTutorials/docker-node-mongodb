import type { Types } from 'mongoose'

export interface ILesson {
  _id?: Types.ObjectId
  name: string
  hours: number
}

export interface IResource {
  _id?: Types.ObjectId
  teachers?: ITeacher[]
  name: string
  lessons: ILesson[]
}

export interface ITeacher {
  _id?: Types.ObjectId
  firstname: string
  lastname: string
  resources: IResource[]
  createdAt?: Date
  updatedAt?: Date
}