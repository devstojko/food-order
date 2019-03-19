import React, { Component } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import './DashboardPage.scss';

class DashboardPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showSidebar: false
    };

    this.toggleSidebar = this.toggleSidebar.bind(this);
  }

  toggleSidebar() {
    this.setState({ showSidebar: !this.state.showSidebar });
  }

  render() {
    const { showSidebar } = this.state;

    return (
      <div className="dashboard-page">
        <Sidebar show={showSidebar} />
        <div className="dashboard-page__right">
          <Navbar toggleSidebar={this.toggleSidebar} />
          <main className="dashboard-page__content">{this.props.children}</main>
        </div>
      </div>
    );
  }
}

export default DashboardPage;
