import React from 'react';

import { bindActionCreators } from 'redux';
import { oneOfType, object } from 'prop-types';
import { connect } from 'react-redux';
import * as warningsSetter from './action/warnings.action.js';

import Warnings from './components/warnings.jsx';

function mapStateToProps(state) {
  return { ...state.warnings };
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators({
			...warningsSetter
		}, dispatch),
		dispatch
	};
}

@connect(mapStateToProps, mapDispatchToProps)
class EventHandling extends React.Component {
    static propTypes = {
        element: oneOfType([object]).isRequired,
        warnings: oneOfType([object]).isRequired,
        actions: oneOfType([object]).isRequired
    }

	render() {
		const { element, warnings, actions } = this.props;

        if (!warnings) return null;

		const { type, message } = warnings,
            Component = element || Warnings;

		if (!type || !message) return null;

		return (
			<div>
				{<Component type={type} message={message} actions={actions} />}
			</div>
		);
	}
}

export default EventHandling;
