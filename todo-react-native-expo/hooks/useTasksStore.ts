import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import type { Task } from '../types/Task.model'

const tasksStorageKey = 'todo-app-tasks'

type Tasks = Task[]

export default function useTasksStore(): [
  Tasks,
  React.Dispatch<React.SetStateAction<Tasks>>
] {
  const [tasks, setTasks] = useState<Tasks>([])

  useEffect(() => {
    ;(async () => {
      setTasks(await getStoredTasks())
    })()
  }, [])

  useEffect(() => {
    storeTasks(tasks)
  }, [tasks])

  const getStoredTasks = async (): Promise<Tasks> => {
    let tasks = await AsyncStorage.getItem(tasksStorageKey)
    if (!tasks) {
      tasks = '[]'
    }
    return JSON.parse(tasks)
  }

  const storeTasks = async (tasks: Tasks = []) => {
    await AsyncStorage.setItem(tasksStorageKey, JSON.stringify(tasks))
  }

  return [tasks, setTasks]
}
