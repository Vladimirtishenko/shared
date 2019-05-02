import React from 'react';
import { oneOfType, string, object } from 'prop-types';

class Warnings extends React.Component {
	static propTypes = {
		message: string.isRequired,
		type: string.isRequired,
		actions: oneOfType([object]).isRequired
	}

	constructor(props) {
		super(props);
		this.__refs = null;
		this.handleClickOutside = ::this.handleClickOutside;
	}

	componentDidMount() {
		document.addEventListener('mousedown', this.handleClickOutside);
	}

	componentWillUnmount() {
		document.removeEventListener('mousedown', this.handleClickOutside);
	}

	handleClickOutside(event) {
		if (this.__refs && !this.__refs.contains(event.target)) {
			this.close();
		}
	}

	close() {
		const { actions: { notificationSetter } } = this.props;
		notificationSetter(null);
	}

	renderNotice() {
		const { type, message } = this.props,
				ico = type === 'error' ? 'bug_report' : 'done_all';

		return (
			<div ref={(refs) => { this.__refs = refs; }} className={`warnings fl fl-align-c fl-justify-st warnings--${type}`}>
				<i className="material-icons warnings">{ico}</i>
				<button type="button" aria-hidden="true" onClick={::this.close} className="warnings__close">×</button>
				<p className="warnings__text" dangerouslySetInnerHTML={{ __html: message }} />
			</div>
		);
	}

    render() {
        return this.renderNotice();
    }
}

export default Warnings;
