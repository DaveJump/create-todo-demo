// import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import {
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  TextInput,
  Keyboard
} from 'react-native'
import TaskItem from './components/TaskItem'
import { taskStyles, taskAddingStyles } from './styles/Task.style'
import type { Task } from './types/Task.model'
import useTasksStore from './hooks/useTasksStore'

export default function App() {
  const [taskText, setTaskText] = useState('')
  const [tasks, setTasks] = useTasksStore()

  const handleTaskTextChange = (text: string) => {
    setTaskText(text)
  }

  const handleTaskRemove = (id: Task['id']) => {
    const taskCopy = [...tasks]
    taskCopy.splice(
      taskCopy.findIndex(item => item.id === id),
      1
    )
    setTasks(taskCopy)
  }

  const handleAddTask = () => {
    if (!taskText) return
    setTasks([
      ...tasks,
      {
        id: Math.floor(Math.random() * 10000),
        text: taskText
      }
    ])
    setTaskText('')
    Keyboard.dismiss()
  }

  return (
    <View style={taskStyles.container}>
      <View style={taskStyles.taskWrapper}>
        <Text style={taskStyles.sectionTitle}>Today's tasks</Text>
        {tasks.map(task => (
          <TouchableOpacity
            key={task.id}
            onPress={() => handleTaskRemove(task.id)}
          >
            <TaskItem text={task.text}></TaskItem>
          </TouchableOpacity>
        ))}
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={taskAddingStyles.wrapper}
      >
        <TextInput
          value={taskText}
          style={taskAddingStyles.input}
          placeholder="Write a task"
          onChangeText={text => handleTaskTextChange(text)}
        ></TextInput>
        <TouchableOpacity onPress={handleAddTask}>
          <View style={taskAddingStyles.addingButton}>
            <Text style={taskAddingStyles.addingButtonText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  )
}
