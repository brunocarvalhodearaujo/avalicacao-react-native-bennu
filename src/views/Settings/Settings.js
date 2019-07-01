/**
 * Copyright 2019-present Bruno Carvalho de Araujo.
 * This source code is licensed under the proprietary license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Component, ReactNode, Fragment } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View } from 'react-native'
import { Appbar } from 'react-native-paper'
import { DrawerActions } from 'react-navigation'

type Props = {
  children: ReactNode
}

type State = {}

export default class Settings extends Component<Props, State> {
  static propTypes = {
    children: PropTypes.element
  }

  static defaultProps = {}

  openMenu = () => {
    this.props.navigation.dispatch(DrawerActions.toggleDrawer())
  }

  render () {
    return (
      <Fragment>
        <Appbar.Header>
          <Appbar.Action icon='menu' onPress={this.openMenu} />
          <Appbar.Content title='Configurações' />
        </Appbar.Header>
        <View style={styles.container}>
          <Text>Open up Settings.js to start working on your app!</Text>
        </View>
      </Fragment>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
})
