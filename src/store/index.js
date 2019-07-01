/**
 * Copyright 2019-present Bruno Carvalho de Araujo.
 * This source code is licensed under the proprietary license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createStore, applyMiddleware, Middleware } from 'redux'
import thunk from 'redux-thunk'
import reducers, { type State } from './reducers'
import firebase from './firebase'

export const enhancer: Middleware[] = [
  thunk.withExtraArgument(firebase)
]

export function configureStore (initialState?: State = {}) {
  return createStore(reducers, initialState, applyMiddleware(...enhancer))
}

export * from './actions'
export * from './reducers'
export { default as actions } from './actions'
