import React from 'react';
import PropTypes from 'prop-types';
import TimerForm from './TimerForm';
import Timer from './Timer';


// In React, this is a STATELESS FUNCTIONAL COMPONENT (better if no lifecycle hooks, no state)
// Alway better to manage state in fewer locations, and using functional
// components encourages this.

// Increased reusability (  FUNCTIONAL!!! )


export default class EditableTimer extends React.Component {

	static propTypes = {
    	id: PropTypes.string.isRequired,
    	title: PropTypes.string.isRequired,
    	project: PropTypes.string.isRequired,
    	elapsed: PropTypes.number.isRequired,
    	isRunning: PropTypes.bool.isRequired,
    	onFormSubmit: PropTypes.func.isRequired,
    	onRemovePress: PropTypes.func.isRequired,
    	onStartPress: PropTypes.func.isRequired,
    	onStopPress: PropTypes.func.isRequired,
	};

	state = {
		editFormOpen: false,
	};


	handleEditPress = () => {
		this.openForm();
	}

	handleFormClose = () => {
		this.closeForm();
	}

	handleSubmit = timer => {
		const { onFormSubmit } = this.props;

		onFormSubmit( timer );
		this.closeForm();

	}

	handleRemovePress = timer => {

		const { id, title, project, elapsed, isRunning, onRemovePress } = this.props;

		onRemovePress( { id, title, project, elapsed, isRunning } );

	}

	closeForm = () => {
		this.setState( { editFormOpen: false } );
	}
	openForm = () => {
		this.setState( {editFormOpen: true });
	}



	// Note the lovely DESTRUCTURING of props and state...

	render() {


		const { id, title, project, elapsed, isRunning, onRemovePress, onStopPress, onStartPress } = this.props;
		const { editFormOpen } = this.state;

		if ( editFormOpen ){
			return <TimerForm 
					id={id} 
					title={title} 
					project={project}
					onFormSubmit={this.handleSubmit}
					onFormClose={this.handleFormClose} 
					/>;
		}

		return (
			<Timer
				id = {id}
				title = {title}
				project = {project}
				elapsed = {elapsed}
				isRunning = {isRunning }
				editFormOpen = {editFormOpen}
				onEditPress={this.handleEditPress}
				onRemovePress={onRemovePress}
				onStopPress={onStopPress}
				onStartPress={onStartPress}
			/>
		);
	}
}