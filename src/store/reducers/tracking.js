/**
 * Copyright 2019-present Bruno Carvalho de Araujo.
 * This source code is licensed under the proprietary license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { combineReducers, type Action as BaseAction } from 'redux'
import {
  type TrackStatus,
  GET_STATUS_CORREIOS_FAILURE,
  GET_STATUS_CORREIOS_REQUEST,
  GET_STATUS_CORREIOS_SUCCESS
} from '../actions'

type Action = BaseAction & {
  error?: Error,
  payload?: TrackStatus[]
}

function data (state: TrackStatus[] = [], action: Action): TrackStatus[] {
  switch (action.type) {
    case GET_STATUS_CORREIOS_SUCCESS:
      return [ action.payload ]
    default:
      return state
  }
}

function isFetching (state: boolean = false, action: Action): boolean {
  switch (action.type) {
    case GET_STATUS_CORREIOS_REQUEST:
      return true
    case GET_STATUS_CORREIOS_FAILURE:
    case GET_STATUS_CORREIOS_SUCCESS:
      return false
    default:
      return state
  }
}

export default combineReducers({ data, isFetching })
