import React, { Component } from 'react';
import Modal from '@common/Modal';
import { getUsersByName, getUserReference } from '@actions/authActions';
import { createGroupChat } from '@actions/chatActions';
import { connect } from 'react-redux';

import Capitalize from '@helpers/Capitalize';
import './_GroupChatForm.scss';
import Avatar from '@common/Avatar';
import img from '@images/46.jpg';

const INITIAL_STATE = {
	groupName: '',
	participants: [],
	page: 1,
	searchUser: '',
	users: []
};
class GroupChatForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			groupName: '',
			participants: [],
			page: 1,
			searchUser: '',
			users: []
		};

		this.handleOnChange = this.handleOnChange.bind(this);
		this.addParticipant = this.addParticipant.bind(this);
		this.removeParticipant = this.removeParticipant.bind(this);
		this.createGroupChat = this.createGroupChat.bind(this);
	}
	getUsers(term) {
		this.setState({ users: [] });
		this.props
			.getUsersByName(term.toLowerCase())
			.then(snapshots => {
				snapshots.forEach(u => {
					const user = { id: u.id, ...u.data() };
					this.setState({ users: [...this.state.users, user] });
				});
			})
			.catch(err => console.log(err));
	}

	handleOnChange(e) {
		console.log(this.state.groupName);
		this.setState(
			{
				[e.target.name]: e.target.value
			},
			() => this.getUsers(this.state.searchUser)
		);
	}

	addParticipant(usr) {
		const exists = this.state.participants.find(item => item === usr);

		if (exists) {
			return false;
		} else {
			this.setState(
				{
					participants: [...this.state.participants, usr]
				},
				() => this.setState({ searchUser: '' })
			);
		}
	}
	removeParticipant(id) {
		this.setState({
			participants: this.state.participants.filter(p => p.id !== id)
		});
	}

	createGroupChat(e) {
		e.preventDefault();
		const participants = [this.props.getUserReference(this.props.user.id)];
		this.state.participants.forEach(p =>
			participants.push(this.props.getUserReference(p.id))
		);

		console.log(participants);

		this.props.createGroupChat(this.state.groupName, participants);
		// this.setState({ ...INITIAL_STATE });
		this.props.clearState();
	}

	render() {
		return (
			<Modal>
				<div className="group-chat-form">
					<form
						onSubmit={this.createGroupChat}
						style={{ display: 'flex', flexDirection: 'column' }}>
						{this.state.page === 1 ? (
							<React.Fragment>
								<div className="group-chat-form__header">
									<a className="close-btn" onClick={this.props.clearState}>
										<i className="fa fa-times" />
									</a>
									<h4
										className="subheading"
										style={{ flex: '2', textAlign: 'left' }}>
										New Group Chat
									</h4>
								</div>
								<div className="group-icon-container" />
								<a className="group-icon">
									<Avatar src={img} />
								</a>
								<div
									className="field field--small"
									style={{ margin: '0 auto' }}>
									<input
										name="groupName"
										type="text"
										className="field__input"
										placeholder="&nbsp;"
										onChange={this.handleOnChange}
									/>
									<span className="field__label">Group Chat Name</span>
								</div>
								<button
									disabled={!this.state.groupName}
									className="button-next"
									onClick={() =>
										this.setState({
											page: this.state.page + 1
										})
									}>
									<i className="fa fa-long-arrow-right" />
								</button>
							</React.Fragment>
						) : null}

						{this.state.page === 2 ? (
							<React.Fragment>
								<div className="group-chat-form__header">
									<a className="close-btn" onClick={this.props.clearState}>
										<i className="fa fa-times" />
									</a>
									<h4
										className="subheading"
										style={{ flex: '2', textAlign: 'left' }}>
										New group : <strong>{this.state.groupName}</strong>
									</h4>
								</div>
								<div
									className="field field--small "
									style={{ margin: '0 auto', marginTop: '3rem' }}>
									<input
										name="searchUser"
										type="text"
										className="field__input"
										value={this.state.searchUser}
										placeholder="&nbsp;"
										onChange={this.handleOnChange}
									/>
									<span className="field__label">Find users</span>
								</div>
								<div className="group-participants">
									{this.state.participants.map(usr => {
										return (
											<a
												style={{ padding: '1rem' }}
												onClick={() => this.removeParticipant(usr.id)}>
												<Avatar src={img} />
											</a>
										);
									})}
								</div>
								<div className="users-list">
									{this.state.users.map(user => {
										return (
											<div
												key={user.id}
												className="users-list__item"
												onClick={() => this.addParticipant(user)}>
												<Avatar src={img} />
												<div className="users-list__item__details">
													{Capitalize(user.firstName)}{' '}
													{Capitalize(user.lastName)}{' '}
												</div>
												<input type="radio" />
											</div>
										);
									})}
								</div>
								<button className="button-next btn-success" type="submit">
									<i className="fa fa-check" />
								</button>
								<button
									className="button-prev"
									type="button"
									onClick={() =>
										this.setState({
											page: this.state.page - 1
										})
									}>
									<i className="fa fa-long-arrow-left" />
								</button>
							</React.Fragment>
						) : null}
					</form>
				</div>
			</Modal>
		);
	}
}
const mapStateToProps = state => ({
	user: state.auth
});
const mapDispatchToProps = () => ({
	getUsersByName: name => getUsersByName(name),
	getUserReference: id => getUserReference(id),
	createGroupChat: (groupName, participants) =>
		createGroupChat(groupName, participants)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(GroupChatForm);
