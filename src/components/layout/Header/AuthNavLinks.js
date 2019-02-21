import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../../store/actions/authActions';
import { HOME_PAGE } from '../../../constants/routes';
import img from '../../../assets/images/46.jpg';

const AuthNavLinks = props => {
	return (
		<React.Fragment>
			<li>
				<a href="#0" className="nav__link">
					<i className="fa fa-bullseye" />
				</a>
			</li>
			<li>
				<a href="#0" className="nav__link">
					<i className="fa fa-comments-o" />
				</a>
			</li>
			<li>
				<a href="#" className="nav__link">
					<i className="fa fa-bell" />
				</a>
			</li>
			<div className="user">
				<span className="user__username">{props.auth.email}</span>
				<i className="fa fa-chevron-down" />
				<img className="user-avatar" alt="User avatar image" src={img} />
				<div className="dropdown">
					<NavLink to="" className="dropdown__link">
						dadas
					</NavLink>
					<a href="#" onClick={props.logout} className="dropdown__link">
						Logout
					</a>
				</div>
			</div>
		</React.Fragment>
	);
};

const mapDispatchToProps = dispatch => ({
	logout: () => dispatch(signOut())
});
const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AuthNavLinks);
