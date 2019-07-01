import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { withNavigationFocus } from 'react-navigation'
import EditTodo, { type Props as TodosProps } from './EditTodo'
import {
  type State,
  type MergeMapAndDispatchProps,
  actions
} from '../../store'

const mapStateToProps = (state: State, ownProps: TodosProps) => ({
  todo: {
    ...state.todos,
    data: state.todos.data.find(item => item.id === ownProps.navigation.getParam('id'))
  }
})

const mapDispatchToProps = (dispatch: Dispatch, ownProps: TodosProps) => ({
  actions: bindActionCreators({
    deleteTodo: () => actions.todos.deleteTodo(ownProps.navigation.getParam('id')),
    modifyTodo: actions.todos.modifyTodo,
    loadTodos: actions.todos.loadTodos,
    emitFeedback: actions.feedback.emitFeedback
  }, dispatch)
})

export type WrappedComponentProps = MergeMapAndDispatchProps<
  typeof mapStateToProps,
  typeof mapDispatchToProps
>

const WrappedComponent: typeof EditTodo = withNavigationFocus(connect(
  mapStateToProps,
  mapDispatchToProps
)(EditTodo))

export default WrappedComponent
