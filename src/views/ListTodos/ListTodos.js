/**
 * Copyright 2019-present Bruno Carvalho de Araujo.
 * This source code is licensed under the proprietary license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Component, ReactNode, Fragment } from 'react'
import PropTypes from 'prop-types'
import { type WrappedComponentProps } from './index'
import { StyleSheet, View, ScrollView } from 'react-native'
import { DrawerActions, DrawerItemsProps, NavigationEvents } from 'react-navigation'
import moment from 'moment'
import {
  Appbar,
  ActivityIndicator,
  List,
  TouchableRipple,
  Checkbox,
  FAB,
  Caption as BaseCaption,
  Text
} from 'react-native-paper'
import styled from 'styled-components'

const Caption: typeof BaseCaption = styled(BaseCaption)`
  margin-left: 15px;
  font-weight: bold;
  opacity: 0.8;
`

export type Props = DrawerItemsProps & {
  children: ReactNode
}

type State = {}

export default class ListTodos extends Component<Props & WrappedComponentProps, State> {
  static propTypes = {
    children: PropTypes.element
  }

  openMenu = () => {
    this.props.navigation.dispatch(DrawerActions.toggleDrawer())
  }

  onWillFocus = () => {
    this.props.actions.loadTodos()
  }

  render () {
    const { todos: { isFetching, data } } = this.props

    return (
      <Fragment>
        <NavigationEvents
          onWillFocus={this.onWillFocus}
        />
        <Appbar.Header>
          <Appbar.Action icon='menu' onPress={this.openMenu} />
          <Appbar.Content title='Tarefas' />
        </Appbar.Header>
        {isFetching && (
          <View style={styles.container}>
            <ActivityIndicator animating />
          </View>
        )}
        {!isFetching && (
          <ScrollView>
            <List.Section>
              <List.Subheader style={{ fontWeight: 'bold' }}>Em andamento</List.Subheader>
              {data.filter(item => !item.completed).length === 0 && (
                <Caption>Suas tarefas em andamento aparecem aqui!</Caption>
              )}
              {data.filter(item => !item.completed).map((item, index) => (
                <TouchableRipple
                  onPress={() => this.props.navigation.navigate('EditTodo', { id: item.id })}
                  rippleColor='rgba(0, 0, 0, .32)'
                  key={index}>
                  <List.Item
                    title={item.title}
                    description={`${item.description}\n${moment(item.date).format('dddd, MMMM DD, YYYY')}`}
                    left={() => <Checkbox.Android status='unchecked' />}
                  />
                </TouchableRipple>
              ))}
              <List.Subheader style={{ fontWeight: 'bold' }}>Concluidas</List.Subheader>
              {data.filter(item => item.completed).length === 0 && (
                <Caption>Suas tarefas concluídas aparecem aqui!</Caption>
              )}
              {data.filter(item => item.completed).map((item, index) => (
                <TouchableRipple
                  onPress={() => this.props.navigation.navigate('EditTodo', { id: item.id })}
                  rippleColor='rgba(0, 0, 0, .32)'
                  key={index}>
                  <List.Item
                    title={item.title}
                    description={`${item.description}\n${moment(item.date).format('dddd, MMMM DD, YYYY')}`}
                    left={() => <Checkbox.Android status='checked' />}
                  />
                </TouchableRipple>
              ))}
            </List.Section>
          </ScrollView>

        )}
        <FAB
          style={styles.fab}
          icon='add'
          onPress={() => this.props.navigation.navigate('CreateTodo')}
        />
      </Fragment>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0
  }
})
