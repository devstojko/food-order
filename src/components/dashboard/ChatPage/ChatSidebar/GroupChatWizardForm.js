import React, { Component } from 'react';

export default class GroupChatWizardForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      groupName: '',
      searchTerm: '',
      participants: []
    };

    // this.handleChange = this.handleChange.bind(this);
  }

  changePage(pageNum) {
    this.setState({ page: pageNum });
  }

  handleChange(e) {
    this.setState({ groupName: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    console.log('submitted');
  }

  render() {
    const { page, groupName } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        {page === 1 && (
          <div>
            <h3>User avatar placeholder</h3>
            <input value={groupName} onChange={this.handleChange} />
            <button onClick={() => this.changePage(2)}>Next</button>
          </div>
        )}

        {page === 2 && (
          <div>
            <h3>Search</h3>
            <span>search items</span>

            <button onClick={() => this.changePage(1)}>Previous</button>
            <button type="submit">submit</button>
          </div>
        )}
      </form>
    );
  }
}
