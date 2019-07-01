import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import Navigation, { type Props as TodosProps } from './Navigation'
import {
  type State,
  type MergeMapAndDispatchProps,
  actions
} from '../../store'

const mapStateToProps = (state: State, ownProps: TodosProps) => ({
  user: state.user
})

const mapDispatchToProps = (dispatch: Dispatch,  ownProps: OwnProps) => ({
  actions: bindActionCreators({
    logOut: actions.user.logOut
  }, dispatch)
})

export type WrappedComponentProps = MergeMapAndDispatchProps<
  typeof mapStateToProps,
  typeof mapDispatchToProps
>

const WrappedComponent: typeof Navigation = connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation)

export default WrappedComponent
