/**
 * Copyright 2019-present Bruno Carvalho de Araujo.
 * This source code is licensed under the proprietary license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { combineReducers } from 'redux'
import feedback from './feedback'
import user from './user'
import todos from './todos'

const reducers = combineReducers({
  feedback,
  todos,
  user
})

export type State = ReturnType<typeof reducers>
export type MergeMapAndDispatchProps<MapStateToProps, MapDispatchToProps> =
  & ReturnType<MapStateToProps>
  & ReturnType<MapDispatchToProps>

export default reducers
