import { DiaryEntry } from './interfaces'

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>
export type NewDiaryEntry = Omit<DiaryEntry, 'id'>
