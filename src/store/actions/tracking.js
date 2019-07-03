/**
 * Copyright 2019-present Bruno Carvalho de Araujo.
 * This source code is licensed under the proprietary license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { type Dispatch } from 'redux'
import { type State } from '../reducers'
import moment from 'moment'

export type TrackStatus = {
  location: string,
  description: string,
  createdAt: number
}

export const GET_STATUS_CORREIOS_REQUEST = Symbol('GET_STATUS_CORREIOS_REQUEST')
export const GET_STATUS_CORREIOS_SUCCESS = Symbol('GET_STATUS_CORREIOS_SUCCESS')
export const GET_STATUS_CORREIOS_FAILURE = Symbol('GET_STATUS_CORREIOS_FAILURE')

/**
 * Retorna o status de uma encomenda a partir dos correios
 *
 * @param {string} code código de rastreamento
 * @returns {Promise<void>}
 */
export function getStatusFromCorreios (code: string) {
  return async (dispatch: Dispatch, getState: () => State) => {
    try {
      if (!code) {
        throw new Error('O código de rastreamento não foi informado')
      }

      dispatch({ type: GET_STATUS_CORREIOS_REQUEST })

      const response = await fetch(`http://rastreamento.ns2online.com.br/search/${code}`)

      if (response.status !== 200) {
        throw new Error('Erro ao consultar os dados do rastreamento')
      }

      const status = await response.json()
        .then(data => data.map(item => ({
          location: item.localState,
          description: item.description,
          createdAt: moment(`${item.date} ${item.time}`, 'DD/MM/YYYY hh:mm').unix()
        })))

      dispatch({ type: GET_STATUS_CORREIOS_SUCCESS, payload: { status, code } })
    } catch (error) {
      dispatch({ type: GET_STATUS_CORREIOS_FAILURE, error })
    }
  }
}
