/**
 * Copyright 2019-present Bruno Carvalho de Araujo.
 * This source code is licensed under the proprietary license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Platform, View, Text } from 'react-native'
import { TextInput as BaseTextInput, FAB as BaseFAB, Checkbox } from 'react-native-paper'
import styled, { css } from 'styled-components'
import { type Item } from '../../store'
import { SafeAreaView } from 'react-navigation'
import DateTimeInput from '../DateTimeInput'
import moment from 'moment'

const TextInput = styled(BaseTextInput)`
  margin-bottom: 5px;

  ${Platform.OS === 'web' && css`
    outline: none;
  `}
`

const Container: typeof SafeAreaView = styled(SafeAreaView)`
  padding: 5px;
`

const FAB: typeof BaseFAB = styled(BaseFAB)`
  z-index: 99;
  position: absolute;
  margin: 16px;
  right: 0;
  bottom: 0;
`

type Props = {
  initialData?: Item,
  onSubmit: (data: Item) => void
}

type State = Partial<Item> & {}

export default class TodoForm extends Component<Props, State> {
  static propTypes = {
    initialData: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      date: PropTypes.any,
      completed: PropTypes.bool
    }),
    onSubmit: PropTypes.func.isRequired
  }

  static defaultProps = {
    initialData: {}
  }

  state = {
    title: '',
    description: '',
    date: moment().toDate()
  }

  componentDidMount () {
    this.setState(this.props.initialData)
  }

  onSubmit = () => {
    this.props.onSubmit({ ...this.state, date: moment(this.state.date).unix() })
  }

  render () {
    const { title, description, completed, date } = this.state
    const editMode = Object.keys(this.props.initialData).length > 0

    return (
      <Fragment>
        <Container>
          <TextInput
            onChangeText={title => this.setState({ title })}
            mode='outlined'
            label='Título'
            value={title}
          />
          <TextInput
            onChangeText={description => this.setState({ description })}
            mode='outlined'
            label='Descrição'
            value={description}
          />
          <DateTimeInput
            value={moment(date).toDate()}
            label='Data e hora da conclusão'
            mode='datetime'
            onChange={date => this.setState({ date })}
          />
          {editMode && (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Checkbox.Android
                status={completed ? 'checked' : 'unchecked'}
                onPress={() => this.setState({ completed: !completed })}
              />
              <Text>Completada?</Text>
            </View>
          )}
        </Container>
        <FAB
          disabled={title === ''}
          icon='done'
          onPress={this.onSubmit}
        />
      </Fragment>
    )
  }
}
