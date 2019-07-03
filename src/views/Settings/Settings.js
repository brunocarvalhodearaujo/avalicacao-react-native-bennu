/**
 * Copyright 2019-present Bruno Carvalho de Araujo.
 * This source code is licensed under the proprietary license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  Component,
  type ReactNode,
  type ComponentType,
  Fragment
} from 'react'
import PropTypes from 'prop-types'
import { type WrappedComponentProps } from './index'
import {
  FAB as BaseFAB,
  Appbar,
  type FABProps,
  List,
  Text
} from 'react-native-paper'
import { DrawerActions } from 'react-navigation'
import styled from 'styled-components'

const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
  margin: 2px;
`

const FAB: ComponentType<FABProps> = styled(BaseFAB)`
  position: absolute;
  margin: 16px;
  right: 0;
  bottom: 0;
`

type Props = {
  children: ReactNode
}

type State = {}

export default class Settings extends Component<Props & WrappedComponentProps, State> {
  static propTypes = {
    children: PropTypes.element
  }

  static defaultProps = {}

  state = {
    open: false
  }

  openMenu = () => {
    this.props.navigation.dispatch(DrawerActions.toggleDrawer())
  }

  componentDidMount () {
    this.props.actions.getStatusFromCorreios('PS339491017BR')
  }

  render () {
    const { tracking } = this.props
    const { open } = this.state

    return (
      <Fragment>
        <Appbar.Header>
          <Appbar.Action icon='menu' onPress={this.openMenu} />
          <Appbar.Content title='Rastreamento' />
          <Appbar.Action icon='add' onPress={this.openMenu} />
        </Appbar.Header>
        <Container>
          <List.Section title='Accordions'>
            <List.Accordion
              title='Uncontrolled Accordion'
              left={props => <List.Icon {...props} icon='folder' />}
            >
              <List.Item title='First item' />
              <List.Item title='Second item' />
            </List.Accordion>
          </List.Section>
          <Text>{JSON.stringify(tracking, undefined, 2)}</Text>
        </Container>
        <FAB.Group
          open={open}
          icon={open ? 'today' : 'add'}
          actions={[
            { icon: 'add', onPress: () => console.log('Pressed add') },
            { icon: 'star', label: 'Star', onPress: () => console.log('Pressed star') },
            { icon: 'email', label: 'Email', onPress: () => console.log('Pressed email') },
            { icon: 'notifications', label: 'Remind', onPress: () => console.log('Pressed notifications') }
          ]}
          onStateChange={({ open }) => this.setState({ open })}
          onPress={() => {
            if (this.state.open) {
              // do something if the speed dial is open
            }
          }}
        />
      </Fragment>
    )
  }
}
