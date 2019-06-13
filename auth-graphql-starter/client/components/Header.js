import React, { Component } from 'react';
import { Link } from 'react-router';
import { graphql } from 'react-apollo';

import query from '../queries/CurrentUser';
import mutation from '../mutations/Logout';

class Header extends Component {
  onLogoutClick() {
    this.props.mutate({})
      .then(() => this.props.data.refetch());
  }

  renderButtons() {
    const { loading, user } = this.props.data;

    if (loading) { return <div />; }

    if (user) {
      return (
        <li>
          <a onClick={this.onLogoutClick.bind(this)}>
            Log out
          </a>
        </li>
      )
    } else {
      return (
        <div>
          <li>
            <Link to="/signup">
              Sign up
          </Link>
          </li>
          <li>
            <Link to="/login">
              Log in
          </Link>
          </li>
        </div>
      );
    }
  }

  render() {
    return (
      <nav className="nav-wrapper">
        <div className="container">
          <Link to="/" className="brand-logo left">Home</Link>
          <ul className="right">
            {this.renderButtons()}
          </ul>
        </div>
      </nav>
    );
  }
}

export default graphql(mutation)(
  graphql(query)(Header)
);
