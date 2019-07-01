/**
 * Copyright 2019-present Bruno Carvalho de Araujo.
 * This source code is licensed under the proprietary license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Component, Fragment, CSSProperties } from 'react'
import PropTypes from 'prop-types'
import { Button as BaseButton } from 'react-native-paper'
import DateTimePicker from 'react-native-modal-datetime-picker'
import styled from 'styled-components'
import moment from 'moment'

const Button: typeof BaseButton = styled(BaseButton)`
  margin-top: 5px;
`

type Props = {
  style?: CSSProperties,
  value: number,
  label: string,
  mode: 'date' | 'time' | 'datetime',
  onChange: (value: number|string) => void
}

type State = {
  value: number,
  visible: boolean
}

export default class DateTimeInput extends Component<Props, State> {
  static propTypes = {
    style: PropTypes.object,
    value: PropTypes.any,
    label: PropTypes.string,
    mode: PropTypes.oneOf([ 'date', 'time', 'datetime' ]).isRequired,
    onChange: PropTypes.func.isRequired
  }

  state = {
    visible: false
  }

  toggleTimePickerVisibility = () => {
    this.setState({ visible: !this.state.visible })
  }

  handleDatePicked = (value) => {
    this.props.onChange(value)
    this.toggleTimePickerVisibility()
  }

  render () {
    const { mode, label, value, ...ownProps } = this.props
    const { visible } = this.state

    return (
      <Fragment>
        <Button
          {...ownProps}
          mode='outlined'
          children={label}
          onPress={this.toggleTimePickerVisibility}
        />
        <DateTimePicker
          cancelTextIOS='Cancelar'
          confirmTextIOS='Confirmar'
          date={moment(value).toDate()}
          mode={mode}
          titleIOS={label}
          isVisible={visible}
          onConfirm={this.handleDatePicked}
          onCancel={this.toggleTimePickerVisibility}
        />
      </Fragment>
    )
  }
}
