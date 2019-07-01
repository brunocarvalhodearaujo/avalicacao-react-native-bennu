import { type Dispatch } from 'redux'
import { type State } from '../reducers'
import { type Firebase } from '../firebase'
import * as Facebook from 'expo-facebook'
import { Alert, AsyncStorage } from 'react-native'

export type User = {
  /**
   * id do usuário
   */
  id: number,
  /**
   * nome do usuário
   */
  name: string
}

export const CHECK_USER_REQUEST = Symbol('CHECK_USER_REQUEST')
export const CHECK_USER_SUCCESS = Symbol('CHECK_USER_SUCCESS')
export const CHECK_USER_FAILURE = Symbol('CHECK_USER_FAILURE')
export const LOGIN_USER_REQUEST = Symbol('LOGIN_USER_REQUEST')
export const LOGIN_USER_SUCCESS = Symbol('LOGIN_USER_SUCCESS')
export const LOGIN_USER_FAILURE = Symbol('LOGIN_USER_FAILURE')
export const LOGOUT_USER_REQUEST = Symbol('LOGOUT_USER_REQUEST')
export const LOGOUT_USER_SUCCESS = Symbol('LOGOUT_USER_SUCCESS')
export const LOGOUT_USER_FAILURE = Symbol('LOGOUT_USER_FAILURE')

/**
 * verifica se o usuário está authenticado
 */
export function isAuthenticated () {
  return async (dispatch: Dispatch, getState: () => State, firebase: Firebase) => {
    dispatch({ type: CHECK_USER_REQUEST })

    try {
      const data = await AsyncStorage.getItem('@user:account')

      if (data !== null) {
        dispatch({ type: CHECK_USER_SUCCESS, payload: JSON.parse(data) })
      }
    } catch (error) {
      dispatch({ type: CHECK_USER_FAILURE, error })
    }
  }
}

/**
 * efetua login do usuário usando a conta do facebook
 */
export function logIn () {
  return async (dispatch: Dispatch, getState: () => State, firebase: Firebase)  => {
    dispatch({ type: LOGIN_USER_REQUEST })

    try {
      const { type, token } = await Facebook.logInWithReadPermissionsAsync('441785023067097', {
        permissions: [
          'public_profile',
          'email'
        ],
        behavior: 'web'
      })

      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`)
        const payload = await response.json()
        // save user information
        await AsyncStorage.setItem('@user:account', JSON.stringify(payload))
        // aciona os eventos de login
        dispatch({ type: LOGIN_USER_SUCCESS, payload })
        dispatch(isAuthenticated())
      }
    } catch (error) {
      dispatch({ type: LOGIN_USER_FAILURE, error })
    }
  }
}

export function logOut () {
  return async (dispatch: Dispatch, getState: () => State, firebase: Firebase)  => {
    dispatch({ type: LOGOUT_USER_REQUEST })

    try {
      await AsyncStorage.removeItem('@user:account')

      dispatch({ type: LOGOUT_USER_SUCCESS })
      dispatch(isAuthenticated())
    } catch (error) {
      dispatch({ type: LOGOUT_USER_FAILURE, error })
    }
  }
}
