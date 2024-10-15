import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SingleTodo from './SingleTodo'

const TodosContainer = () => {
    return (
        <View style={styles.todoContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <SingleTodo />
                <SingleTodo />
                <SingleTodo />
                <SingleTodo />
                <SingleTodo />
                <SingleTodo />
                <SingleTodo />
                <SingleTodo />
                <SingleTodo />
                <SingleTodo />
                <SingleTodo />
                <SingleTodo />
                <SingleTodo />
                <SingleTodo />
                <SingleTodo />
                <SingleTodo />
            </ScrollView>

        </View>
    )
}

export default TodosContainer

const styles = StyleSheet.create({
    todoContainer: {
        flex: 1
    }
})