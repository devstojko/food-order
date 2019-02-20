import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import HamburgerIcon from './HamburgerIcon';
import AuthLinks from './AuthLinks';
import NonAuthLinks from './NonAuthLinks';
import './Navbar.scss';

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPhoneLinks: false
    };

    this.togglePhoneLinks = this.togglePhoneLinks.bind(this);
  }

  togglePhoneLinks() {
    this.setState({ showPhoneLinks: !this.state.showPhoneLinks });
  }

  render() {
    return (
      <nav className="navbar">
        <div className="container">
          <div className="navbar__link-group">
            <Link to="/" className="navbar__link">
              Food Order
            </Link>
          </div>

          {/* All screens except phone */}
          <div className="navbar__link-group navbar__link-group--right">
            {this.props.authUser ? <AuthLinks /> : <NonAuthLinks />}
          </div>

          {/* Only for phone screens */}
          <HamburgerIcon onClick={this.togglePhoneLinks} />
          <div
            className="phone-links"
            style={{
              display: this.state.showPhoneLinks ? 'block' : 'none'
            }}>
            {this.props.authUser ? <AuthLinks /> : <NonAuthLinks />}
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = ({ authUser }) => ({ authUser });

Navbar.propTypes = {
  authUser: PropTypes.object
};

export default connect(mapStateToProps)(Navbar);
