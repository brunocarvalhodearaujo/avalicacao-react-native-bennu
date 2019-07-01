/**
 * Copyright 2019-present Bruno Carvalho de Araujo.
 * This source code is licensed under the proprietary license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { combineReducers, Action as BaseAction } from 'redux'
import { type User } from '../actions'
import * as actionTypes from '../actions'

type Action = BaseAction & {
  payload?: boolean | User,
  error?: Error
}

function data (state: User = {}, action: Action): User {
  switch (action.type) {
    case actionTypes.LOGIN_USER_SUCCESS:
      return {}
    case actionTypes.CHECK_USER_SUCCESS:
      return action.payload
    default:
      return state
  }
}

function isAuthenticated (state: boolean = false, action: Action): boolean {
  switch (action.type) {
    case actionTypes.CHECK_USER_SUCCESS:
      return true
    case actionTypes.CHECK_USER_REQUEST:
    case actionTypes.CHECK_USER_FAILURE:
    case actionTypes.LOGIN_USER_SUCCESS:
      return false
    default:
      return state
  }
}

function isFetching (state: boolean = false, action: Action): boolean {
  switch (action.type) {
    case actionTypes.CHECK_USER_FAILURE:
    case actionTypes.CHECK_USER_SUCCESS:
      return false
    case actionTypes.CHECK_USER_REQUEST:
      return true
    default:
      return state
  }
}

export default combineReducers({
  data,
  isAuthenticated,
  isFetching
})
