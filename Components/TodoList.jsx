import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TodoInput from './TodoInput'
import { BG_COLOR } from '../Constants'
import TodosContainer from './TodosContainer'

const TodoList = () => {
    return (
        <View style={styles.container}>
            <TodoInput />
            <TodosContainer/>
        </View>
    )
}

export default TodoList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BG_COLOR,
        padding: 15,
    },
})