export interface Todo {
  id: number | string
  title: string
  desc?: string
  expDate?: Date | string
  done: boolean
}

export enum FilterItems {
  'All' = 1,
  'Done',
  'Undone'
}
