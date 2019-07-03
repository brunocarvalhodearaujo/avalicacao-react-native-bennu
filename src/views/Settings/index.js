import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import Settings, { type Props as SettingsProps } from './Settings'
import {
  type State,
  type MergeMapAndDispatchProps,
  actions
} from '../../store'

const mapStateToProps = (state: State, ownProps: SettingsProps) => ({
  tracking: state.tracking
})

const mapDispatchToProps = (dispatch: Dispatch, ownProps: SettingsProps) => ({
  actions: bindActionCreators({
    getStatusFromCorreios: actions.tracking.getStatusFromCorreios
  }, dispatch)
})

export type WrappedComponentProps = MergeMapAndDispatchProps<
  typeof mapStateToProps,
  typeof mapDispatchToProps
>

const WrappedComponent: typeof Settings = connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings)

export default WrappedComponent
