import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logOut } from '@actions/authActions';
import Search from '@common/Search';
import Avatar from '@common/Avatar';
import firebase from '@fb';
import capitalize from '@helpers/capitalize';
import './Navbar.scss';

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      avatar: ''
    };
  }

  componentDidMount() {
    this.listener = firebase
      .userReference(this.props.authUser.id)
      .onSnapshot(user => {
        if (user.exists) {
          const { firstName, lastName, avatar } = user.data();
          this.setState({
            firstName,
            lastName,
            avatar
          });
        }
      });
  }

  componentWillUnmount() {
    this.listener();
  }

  render() {
    const { logOut } = this.props;
    const { firstName, lastName, avatar } = this.state;

    return (
      <nav className="navbar">
        <div className="navbar__logo">
          <Link to="/">Food-Order</Link>
        </div>
        <div className="navbar__search">
          <Search placeholder="Search transactions, invoices or help" />
        </div>

        <div className="navbar__links">
          <div className="navbar__icons">
            <i className="fas fa-question-circle" />
            <i className="fas fa-comments" />
            <i className="fas fa-bell" />
            <span className="navbar__separator" />
          </div>

          <div className="navbar__user">
            {`${capitalize(firstName)} ${capitalize(lastName)}`}
            <i className="fas fa-angle-down" />
            <Avatar image={avatar} />
            <div className="navbar__dropdown">
              <div className="navbar__dropdown-link">Random Link 1</div>
              <div className="navbar__dropdown-link">Random Link 2</div>
              <div className="navbar__dropdown-link" onClick={logOut}>
                Logout
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = ({ authUser }) => ({ authUser });

export default connect(
  mapStateToProps,
  { logOut }
)(Navbar);
