export interface TodoItem {
  uid: string
  title: string
  done: boolean
}

export type FilterProp = 'All' | 'Done' | 'Undone'
export interface Filter {
  prop: FilterProp,
  active: boolean
}
