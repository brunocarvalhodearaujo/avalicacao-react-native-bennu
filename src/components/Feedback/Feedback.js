/**
 * Copyright 2019-present Bruno Carvalho de Araujo.
 * This source code is licensed under the proprietary license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { type WrappedComponentProps } from './index'
import { Snackbar } from 'react-native-paper'

type Props = {
  feedback: {
    visible?: boolean,
    message?: string
  }
}

export default class Feedback extends Component<Props & WrappedComponentProps> {
  static propTypes = {
    feedback: PropTypes.shape({
      visible: PropTypes.bool,
      message: PropTypes.string
    }).isRequired,
    actions: PropTypes.shape({
      setVisibility: PropTypes.func.isRequired
    })
  }

  render () {
    const { feedback } = this.props

    if (!feedback.visible) {
      return null
    }

    return (
      <Snackbar
        duration={Snackbar.DURATION_LONG}
        visible={feedback.visible}
        children={feedback.message}
        onDismiss={() => this.props.actions.setVisibility(false)}
      />
    )
  }
}
