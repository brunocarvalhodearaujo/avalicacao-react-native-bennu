/**
 * Copyright 2019-present Bruno Carvalho de Araujo.
 * This source code is licensed under the proprietary license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Component, ReactNode, Children } from 'react'
import PropTypes from 'prop-types'
import { type WrappedComponentProps } from './index'
import { StyleSheet, View } from 'react-native'
import { Button, Title } from 'react-native-paper'
import FBIcon from './facebook-icon.png'

export type Props = {
  isAuthenticated: boolean,
  children: ReactNode
}

type State = {}

export default class Login extends Component<Props & WrappedComponentProps, State> {
  static propTypes = {
    actions: PropTypes.shape({
      isAuthenticated: PropTypes.func.isRequired,
      logIn: PropTypes.func.isRequired
    }).isRequired,
    isAuthenticated: PropTypes.bool,
    isFetching: PropTypes.bool,
    children: PropTypes.element
  }

  componentWillMount () {
    this.props.actions.isAuthenticated()
  }

  render () {
    const { isAuthenticated, children, actions } = this.props

    if (isAuthenticated) {
      return Children.only(children)
    }

    return (
      <View style={styles.container}>
        <Title>TodoList</Title>
        <Button
          style={{ backgroundColor: '#3b5998' }}
          icon={FBIcon}
          mode='contained'
          onPress={actions.logIn}>
          Entrar com o Facebook
        </Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
