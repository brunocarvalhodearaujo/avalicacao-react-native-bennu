import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import ListTodos, { type Props as ListTodosProps } from './ListTodos'
import {
  type State,
  type MergeMapAndDispatchProps,
  actions
} from '../../store'

const mapStateToProps = (state: State, ownProps: ListTodosProps) => ({
  todos: state.todos
})

const mapDispatchToProps = (dispatch: Dispatch, ownProps: ListTodosProps) => ({
  actions: bindActionCreators({
    addTodo: actions.todos.addTodo,
    loadTodos: actions.todos.loadTodos,
    modifyTod: actions.todos.modifyTodo
  }, dispatch)
})

export type WrappedComponentProps = MergeMapAndDispatchProps<
  typeof mapStateToProps,
  typeof mapDispatchToProps
>

const WrappedComponent: typeof ListTodos = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListTodos)

export default WrappedComponent
