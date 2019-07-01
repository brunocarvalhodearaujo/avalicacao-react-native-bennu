import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import Login, { type Props as TodosProps } from './Login'
import {
  type State,
  type MergeMapAndDispatchProps,
  logIn,
  actions
} from '../../store'

const mapStateToProps = (state: State, ownProps: TodosProps) => ({
  isFetching: state.user.isFetching,
  isAuthenticated: state.user.isAuthenticated
})

const mapDispatchToProps = (dispatch: Dispatch,  ownProps: OwnProps) => ({
  actions: bindActionCreators({
    logIn: actions.user.logIn,
    isAuthenticated: actions.user.isAuthenticated
  }, dispatch)
})

export type WrappedComponentProps = MergeMapAndDispatchProps<
  typeof mapStateToProps,
  typeof mapDispatchToProps
>

const WrappedComponent: typeof Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)

export default WrappedComponent
