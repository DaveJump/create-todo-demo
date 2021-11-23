import React from 'react'
import type { FC } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { itemstyles as styles } from './TaskItem.style'

interface TaskProps {
  text?: string
}

const Task: FC<TaskProps> = props => {
  return (
    <View style={styles.taskItem}>
      <View style={styles.taskItemLeft}>
        <TouchableOpacity style={styles.square}></TouchableOpacity>
        <Text style={styles.taskItemText}>
          {props.text || (
            <Text style={styles.taskItemText}>{props.children}</Text>
          )}
        </Text>
      </View>
      <View style={styles.circular}></View>
    </View>
  )
}

export default Task
