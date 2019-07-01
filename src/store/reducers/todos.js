/**
 * Copyright 2019-present Bruno Carvalho de Araujo.
 * This source code is licensed under the proprietary license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { combineReducers, type Action as BaseAction } from 'redux'
import { type Item } from '../actions'
import * as actionTypes from '../actions'

type Action = BaseAction & {
  payload?: Item[],
  error?: Error
}

function data (state: Item[] = [], action: Action): Item[] {
  switch (action.type) {
    case actionTypes.CREATE_TODO_SUCCESS:
    case actionTypes.FETCH_TODOS_SUCCESS:
      return state
        .filter(item => !action.payload.map(item => item.id).includes(item.id))
        .concat(action.payload)
        .map(item => ({ ...item, date: item.date * 1000 }))
    case actionTypes.REMOVE_TODO_SUCCESS:
      return state.filter(item => !action.payload.includes(item.id))
    default:
      return state
  }
}

function isFetching (state: boolean = false, action: Action): boolean {
  switch (action.type) {
    case actionTypes.FETCH_TODOS_REQUEST:
      return true
    case actionTypes.CREATE_TODO_SUCCESS:
    case actionTypes.FETCH_TODOS_SUCCESS:
    case actionTypes.FETCH_TODOS_FAILURE:
      return false
    default:
      return state
  }
}

export default combineReducers({ data, isFetching })
