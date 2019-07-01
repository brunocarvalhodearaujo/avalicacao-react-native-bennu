import React, { Fragment } from 'react'
import moment from 'moment'
import 'moment/locale/pt-br'
import { configureStore } from './store'
import { Provider as StoreProvider } from 'react-redux'
import { StatusBar } from 'react-native'
import { Provider as PaperProvider } from 'react-native-paper'
import { createDrawerNavigator, createAppContainer } from 'react-navigation'
import { Login, ListTodos, CreateTodo, EditTodo, Settings } from './views'
import { Navigation, Feedback } from './components'

const Menu = createDrawerNavigator({
  ListTodos: { screen: ListTodos },
  CreateTodo: { screen: CreateTodo },
  EditTodo: { screen: EditTodo },
  Settings: { screen: Settings }
}, { contentComponent: Navigation })

const AppNav = createAppContainer(Menu)

export default function App () {
  StatusBar.setBarStyle('light-content')
  moment.locale('pt-br')

  const store = configureStore()

  return (
    <StoreProvider store={store}>
      <PaperProvider>
        <Fragment>
          <Login>
            <AppNav />
          </Login>
          <Feedback />
        </Fragment>
      </PaperProvider>
    </StoreProvider>
  )
}
