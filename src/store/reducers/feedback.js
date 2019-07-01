/**
 * Copyright 2019-present Bruno Carvalho de Araujo.
 * This source code is licensed under the proprietary license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { combineReducers, Action } from 'redux'
import * as actionTypes from '../actions'

function message (state: string = '', action: Action): string {
  switch (action.type) {
    case actionTypes.SET_FEEDBACK_MESSAGE:
      return action.payload
    default:
      return state
  }
}

function visible (state: boolean = false, action: Action): boolean {
  switch (action.type) {
    case actionTypes.SET_FEEDBACK_VISIBILITY:
      return action.payload
    default:
      return state
  }
}

export default combineReducers({
  message,
  visible
})
