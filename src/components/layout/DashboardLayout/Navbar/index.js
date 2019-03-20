import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logOut } from '@actions/authActions';
import Search from '@common/Search';
import Avatar from '@common/Avatar';
import firebase from '@fb';
import capitalize from '@helpers/capitalize';
import './Navbar.scss';

const Hamburger = ({ onClick }) => (
  <div className="navbar__hamburger" onClick={onClick}>
    <i className="fas fa-bars" />
  </div>
);

const NavbarIcons = () => (
  <div className="navbar__icons">
    <i className="fas fa-question-circle" />
    <i className="fas fa-comments" />
    <i className="fas fa-bell" />
  </div>
);

const NavbarDropdown = ({ logOut }) => (
  <div className="navbar__dropdown">
    <Link to="/profile-settings" className="navbar__dropdown-link">
      Settings
    </Link>
    <div className="navbar__dropdown-link" onClick={logOut}>
      Logout
    </div>
  </div>
);

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      avatar: '',
      showSubmenu: false
    };

    this.toggleSubmenu = this.toggleSubmenu.bind(this);
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

  toggleSubmenu() {
    this.setState({ showSubmenu: !this.state.showSubmenu });
  }

  componentWillUnmount() {
    this.listener();
  }

  render() {
    const { logOut, toggleSidebar } = this.props;
    const { firstName, lastName, avatar, showSubmenu } = this.state;

    return (
      <nav className="navbar">
        <Hamburger onClick={toggleSidebar} />

        <div className="navbar__search">
          <Search placeholder="Search transactions, invoices or help" />
        </div>

        <div className="navbar__desktop">
          <div className="navbar__links">
            <NavbarIcons />
            <div className="navbar__user">
              {`${capitalize(firstName)} ${capitalize(lastName)}`}
              <i className="fas fa-angle-down" />
              <Avatar image={avatar} />
              <NavbarDropdown logOut={logOut} />
            </div>
          </div>
        </div>

        <div className="navbar__smaller-screens">
          <Avatar
            image={avatar}
            onClick={this.toggleSubmenu}
            style={{ cursor: 'pointer' }}
          />

          <div className={`navbar__submenu ${showSubmenu ? 'open' : ''}`}>
            <NavbarIcons />
            <NavbarDropdown logOut={logOut} />
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
