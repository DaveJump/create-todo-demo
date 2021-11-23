import { StyleSheet } from 'react-native'

export const itemstyles = StyleSheet.create({
  taskItem: {
    backgroundColor: '#fff',
    borderRadius: 6,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  taskItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: '#55bcf6',
    opacity: 0.4,
    borderRadius: 6,
    marginRight: 15
  },
  taskItemText: {
    maxWidth: '80%'
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: '#55bcf6',
    borderWidth: 2,
    borderRadius: 5
  }
})
