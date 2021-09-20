export enum EFilterItems {
  'all' = 1,
  'done',
  'undone'
}
export interface ITodo {
  id: number | string
  title: string
  done: boolean
  addTime?: number
}
