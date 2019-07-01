/**
 * Copyright 2019-present Bruno Carvalho de Araujo.
 * This source code is licensed under the proprietary license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { type Dispatch } from 'redux'
import { type State } from '../reducers'
import { type Firebase } from '../firebase'
import shortid from 'shortid'
import moment from 'moment'

export const FETCH_TODOS_REQUEST = Symbol('FETCH_TODOS_REQUEST')
export const FETCH_TODOS_SUCCESS = Symbol('FETCH_TODOS_SUCCESS')
export const FETCH_TODOS_FAILURE = Symbol('FETCH_TODOS_FAILURE')
export const CREATE_TODO_REQUEST = Symbol('CREATE_TODO_REQUEST')
export const CREATE_TODO_SUCCESS = Symbol('CREATE_TODO_SUCCESS')
export const CREATE_TODO_FAILURE = Symbol('CREATE_TODO_FAILURE')
export const MODIFY_TODO_REQUEST = Symbol('MODIFY_TODO_REQUEST')
export const MODIFY_TODO_SUCCESS = Symbol('MODIFY_TODO_SUCCESS')
export const MODIFY_TODO_FAILURE = Symbol('MODIFY_TODO_FAILURE')
export const REMOVE_TODO_REQUEST = Symbol('REMOVE_TODO_REQUEST')
export const REMOVE_TODO_SUCCESS = Symbol('REMOVE_TODO_SUCCESS')
export const REMOVE_TODO_FAILURE = Symbol('REMOVE_TODO_FAILURE')

/**
 * representa uma tarefa do todo
 */
export type Item = {
  id?: string,
  title: string,
  description: string,
  completed?: boolean,
  date?: string,
  createdAt?: number
}

/**
 * recupera os todos do firebase
 */
export function loadTodos () {
  return (dispatch: Dispatch, getState: () => State, firebase: Firebase) => {
    dispatch({ type: FETCH_TODOS_REQUEST })

    const { user: { data: { id: userId } } } = getState()

    return firebase.database()
      .ref(`/${userId}`)
      .once('value')
      .then(snapshot => snapshot === null ? {} : snapshot.val())
      .then(Object.values)
      .then(payload => dispatch({ type: FETCH_TODOS_SUCCESS, payload }))
      .catch(error => dispatch({ type: FETCH_TODOS_FAILURE, error }))
  }
}

/**
 * adiciona um novo todo ao firebase
 */
export function addTodo (todo: Item = {}) {
  return (dispatch: Dispatch, getState: () => State, firebase: Firebase) => {
    dispatch({ type: CREATE_TODO_REQUEST })

    todo = {
      id: shortid(),
      completed: false,
      date: moment().add(2, 'days').toDate(),
      createdAt: moment().unix(),
      ...todo
    }

    const { user: { data: { id: userId } } } = getState()

    return firebase.database()
      .ref(`/${userId}/${todo.id}`)
      .set(todo)
      .then(() => dispatch({ type: CREATE_TODO_SUCCESS, payload: [ todo ] }))
      .catch(error => dispatch({ type: CREATE_TODO_FAILURE, error }))
  }
}

/**
 * modifica as informações de um todo
 */
export function modifyTodo (todo: Item) {
  return (dispatch: Dispatch, getState: () => State, firebase: Firebase) => {
    dispatch({ type: MODIFY_TODO_REQUEST })

    const { user: { data: { id: userId } } } = getState()

    return firebase.database()
      .ref(`/${userId}/${todo.id}`)
      .set(todo)
      .then(() => dispatch({ type: MODIFY_TODO_SUCCESS, payload: [ todo ] }))
      .catch(error => dispatch({ type: MODIFY_TODO_FAILURE, error }))
  }
}

export function deleteTodo (todoId: string) {
  return (dispatch: Dispatch, getState: () => State, firebase: Firebase) => {
    dispatch({ type: REMOVE_TODO_REQUEST })

    const { user: { data: { id: userId } } } = getState()

    return firebase.database()
      .ref(`/${userId}/${todoId}`)
      .remove()
      .then(() => dispatch({ type: REMOVE_TODO_SUCCESS, payload: [ todoId ] }))
      .catch(error => dispatch({ type: REMOVE_TODO_FAILURE, error }))
  }
}
