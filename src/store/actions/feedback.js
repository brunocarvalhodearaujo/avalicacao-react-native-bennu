/**
 * Copyright 2019-present Bruno Carvalho de Araujo.
 * This source code is licensed under the proprietary license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { type Dispatch } from 'redux'
import { type State } from '../reducers'
import { type Firebase } from '../firebase'

export const SET_FEEDBACK_MESSAGE = Symbol('SET_FEEDBACK_MESSAGE')
export const SET_FEEDBACK_VISIBILITY = Symbol('SET_FEEDBACK_VISIBILITY')

export function setFeedbackVisibility (payload: boolean) {
  return (dispatch: Dispatch, getState: () => State, firebase: Firebase) => {
    dispatch({
      type: SET_FEEDBACK_VISIBILITY,
      payload
    })
  }
}

export function emitFeedback (message: string, timeout?: number = 5000) {
  return (dispatch: Dispatch, getState: () => State, firebase: Firebase) => {
    return Promise.resolve()
      .then(() => dispatch(setFeedbackVisibility(false)))
      .then(() => dispatch({ type: SET_FEEDBACK_MESSAGE, payload: message }))
      .then(() => dispatch(setFeedbackVisibility(true)))
      .then(() => setTimeout(() => dispatch(setFeedbackVisibility(false)), timeout))
  }
}
