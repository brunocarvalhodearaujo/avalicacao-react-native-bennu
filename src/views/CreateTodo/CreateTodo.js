/**
 * Copyright 2019-present Bruno Carvalho de Araujo.
 * This source code is licensed under the proprietary license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { type WrappedComponentProps } from './index'
import { Appbar } from 'react-native-paper'
import { DrawerItemsProps } from 'react-navigation'
import { TodoForm } from '../../components'

export type Props = DrawerItemsProps & {}

export default class CreateTodo extends Component<Props & WrappedComponentProps> {
  static propTypes = {
    actions: PropTypes.shape({}).isRequired
  }

  goBack = () => {
    this.props.navigation.goBack()
  }

  onSubmit = (todo) => {
    this.props.actions.addTodo(todo)
      .then(this.goBack)
      .then(() => this.props.actions.emitFeedback('A tarefa foi criada com sucesso'))
      .catch(() => this.props.actions.emitFeedback('Falha ao cadastrar a tarefa'))
  }

  render () {
    const { isFocused } = this.props

    if (!isFocused) {
      return null
    }

    return (
      <Fragment>
        <Appbar.Header>
          <Appbar.BackAction onPress={this.goBack} />
          <Appbar.Content title='Adicionar nova tarefa' />
        </Appbar.Header>
        <TodoForm
          onSubmit={this.onSubmit}
        />
      </Fragment>
    )
  }
}
