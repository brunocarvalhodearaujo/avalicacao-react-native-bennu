import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { withNavigationFocus } from 'react-navigation'
import CreateTodo, { type Props as CreateTodoProps } from './CreateTodo'
import { type State, type MergeMapAndDispatchProps, actions } from '../../store'

const mapStateToProps = (state: State, ownProps: CreateTodoProps) => ({})

const mapDispatchToProps = (dispatch: Dispatch, ownProps: CreateTodoProps) => ({
  actions: bindActionCreators({
    addTodo: actions.todos.addTodo,
    emitFeedback: actions.feedback.emitFeedback
  }, dispatch)
})

export type WrappedComponentProps = MergeMapAndDispatchProps<
  typeof mapStateToProps,
  typeof mapDispatchToProps
>

const WrappedComponent: typeof CreateTodo = withNavigationFocus(connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateTodo))

export default WrappedComponent
