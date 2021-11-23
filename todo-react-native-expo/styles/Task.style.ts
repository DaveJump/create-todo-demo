import { StyleSheet } from 'react-native'

export const taskStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8eaed'
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30
  },
  taskWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20
  },
  tasks: {}
})

export const taskAddingStyles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    padding: 15,
    width: 250,
    borderRadius: 60,
    backgroundColor: '#fff',
    borderColor: '#c0c0c0',
    borderWidth: 1,
    textAlign: 'center'
  },
  addingButton: {
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#c0c0c0',
    borderWidth: 1
  },
  addingButtonText: {
    fontSize: 28,
    fontWeight: 'normal',
    color: '#666'
  }
})
