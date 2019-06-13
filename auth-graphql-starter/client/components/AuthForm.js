import React, { Component } from 'react';

class AuthForm extends Component {
  constructor(props) {
    super(props);

    this.state = INITIAL_STATE;
  }

  onSubmit(event) {
    event.preventDefault();

    this.props.onSubmit(this.state);
    this.setState(INITIAL_STATE);
  }

  renderErrors() {
    this.props.errors.map(message => M.toast({ html: message }));
  }

  render() {
    this.renderErrors();
    return (
      <div className="row">
        <form className="col s6" onSubmit={this.onSubmit.bind(this)}>
          <div className="input-field">
            <input
              placeholder="Email"
              value={this.state.email}
              onChange={e => this.setState({ email: e.target.value })}
            />
          </div>

          <div className="input-field">
            <input
              placeholder="Password"
              type="password"
              value={this.state.password}
              onChange={e => this.setState({ password: e.target.value })}
            />
          </div>
          <button className="btn">Submit</button>
        </form >
      </div >
    )
  }
}

const INITIAL_STATE = {
  email: '',
  password: ''
};

export default AuthForm;
