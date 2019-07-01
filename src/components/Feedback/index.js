import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import Feedback, { type Props as TodosProps } from './Feedback'
import { type State, type MergeMapAndDispatchProps } from '../../store'

const mapStateToProps = (state: State, ownProps: TodosProps) => ({
  feedback: state.feedback
})

const mapDispatchToProps = (dispatch: Dispatch, ownProps: TodosProps) => ({
  actions: bindActionCreators({}, dispatch)
})

export type WrappedComponentProps = MergeMapAndDispatchProps<
  typeof mapStateToProps,
  typeof mapDispatchToProps
>

const WrappedComponent: typeof Feedback = connect(
  mapStateToProps
)(Feedback)

export default WrappedComponent
