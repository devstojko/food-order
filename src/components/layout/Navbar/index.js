import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Navbar.scss';

class Navbar extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   showPhoneLinks: false
    // };

    // this.togglePhoneLinks = this.togglePhoneLinks.bind(this);
  }

  // togglePhoneLinks() {
  //   this.setState({ showPhoneLinks: !this.state.showPhoneLinks });
  // }

  render() {
    return <nav className="navbar" />;
  }
}

const mapStateToProps = ({ authUser }) => ({ authUser });

Navbar.propTypes = {
  authUser: PropTypes.object
};

export default connect(mapStateToProps)(Navbar);
