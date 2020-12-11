import { RouteRecordRaw } from 'vue-router'
import TodoList from '../views/List.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'TodoList',
    component: TodoList,
    meta: {
      title: 'TodoList'
    }
  }
]

export default routes