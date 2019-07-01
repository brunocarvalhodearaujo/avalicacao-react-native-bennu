/**
 * Copyright 2019-present Bruno Carvalho de Araujo.
 * This source code is licensed under the proprietary license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Component, ReactNode, Fragment } from 'react'
import PropTypes from 'prop-types'
import { type WrappedComponentProps } from './index'
import { Appbar, Dialog, Paragraph, Button } from 'react-native-paper'
import { DrawerItemsProps, NavigationEvents } from 'react-navigation'
import { TodoForm } from '../../components'

export type Props = DrawerItemsProps & {
  children: ReactNode
}

type State = {
  deleleDialogIsvisible: boolean
}

export default class EditTodo extends Component<Props & WrappedComponentProps, State> {
  static propTypes = {
    children: PropTypes.element
  }

  state = {
    deleleDialogIsvisible: false
  }

  toggleDeleleDialogVisibility = () => {
    this.setState({ deleleDialogIsvisible: !this.state.deleleDialogIsvisible })
  }

  goBack = () => {
    this.props.navigation.goBack()
  }

  deleteTodo = () => {
    this.props.actions.deleteTodo()
      .then(this.goBack)
      .then(() => this.props.actions.emitFeedback('A tarefa foi excluida com sucesso'))
      .catch(() => this.props.actions.emitFeedback('Falha ao excluir a tarefa'))
  }

  editTodo = (changes) => {
    this.props.actions.modifyTodo({ ...this.props.todo.data, ...changes })
      .then(this.goBack)
      .then(() => this.props.actions.loadTodos())
      .then(() => this.props.actions.emitFeedback('A tarefa foi modificada com sucesso'))
      .catch(() => this.props.actions.emitFeedback('Falha ao modificar a tarefa'))
  }

  onDidFocus = () => {
    this.setState({ deleleDialogIsvisible: false })
  }

  render () {
    const { todo, isFocused } = this.props
    const { deleleDialogIsvisible } = this.state

    return (
      <Fragment>
        <NavigationEvents
          onWillFocus={this.onDidFocus}
        />
        <Appbar.Header>
          <Appbar.BackAction onPress={this.goBack} />
          <Appbar.Content title='Edição da tarefa' />
          <Appbar.Action
            icon='delete'
            onPress={this.toggleDeleleDialogVisibility}
          />
        </Appbar.Header>
        {isFocused && (
          <TodoForm
            initialData={todo.data}
            onSubmit={this.editTodo}
          />
        )}
        <Dialog
          visible={deleleDialogIsvisible}
          onDismiss={this.toggleDeleleDialogVisibility}>
          <Dialog.Title>Você confirma a excluisão do lembrete?</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Essa ação é irreversível</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={this.deleteTodo}>Confirmar</Button>
          </Dialog.Actions>
        </Dialog>
      </Fragment>
    )
  }
}
