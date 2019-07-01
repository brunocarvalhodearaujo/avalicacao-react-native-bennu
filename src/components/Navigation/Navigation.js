/**
 * Copyright 2019-present Bruno Carvalho de Araujo.
 * This source code is licensed under the proprietary license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { View, ScrollView } from 'react-native'
import { Drawer, Avatar, Text, Divider } from 'react-native-paper'
import { SafeAreaView, DrawerItemsProps } from 'react-navigation'
import { type WrappedComponentProps } from './index'

export type Props = DrawerItemsProps & {
  user: {
    name: string
  },
  actions: {
    logOut: () => void
  }
}

export default class Navigation extends Component<Props & WrappedComponentProps> {
  static propTypes = {
    user: PropTypes.shape({
      isFetching: PropTypes.bool,
      data: PropTypes.shape({
        name: PropTypes.string
      }).isRequired
    }).isRequired,
    actions: PropTypes.shape({
      logOut: PropTypes.func.isRequired
    }).isRequired
  }

  render () {
    const { user, actions } = this.props

    return (
      <Fragment>
        <View style={{ padding: 10, paddingTop: 30 }}>
          <Avatar.Text
            style={{ marginBottom: 10 }}
            size={40}
            label={user.data.name.substr(0, 2).toUpperCase()}
          />
          <Text style={{ fontWeight: 'bold' }}>{user.data.name}</Text>
        </View>
        <Divider />
        <ScrollView>
          <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
            <Drawer.Item
              label='Tarefas'
              onPress={() => this.props.navigation.navigate('ListTodos')}
            />
            <Drawer.Item
              label='Configurações'
              onPress={() => this.props.navigation.navigate('Settings')}
            />
            <Divider />
            <Drawer.Item
              label='Sair'
              onPress={actions.logOut}
            />
          </SafeAreaView>
        </ScrollView>
      </Fragment>
    )
  }
}
