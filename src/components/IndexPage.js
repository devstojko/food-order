import React from 'react';
import { Link } from 'react-router-dom';
// testing
import InputField from './InputField';

class IndexPage extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }

  render() {
    return (
      <div className="homepage">
        <h1>Index Page Content</h1>
        <Link to="/signup">Sign Up</Link>
        <Link to="/signin">Sign In</Link>
        <Link to="/forgot-password">Forgot Password</Link>

        <hr/>
        <InputField
          type="text"
          name="test"
          label="test label"
          value={this.state.value}
          onChange={e => this.setState({ value: e.target.value })}
        />
      </div>
    )
  }
}
  


export default IndexPage;