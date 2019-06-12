import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link, hashHistory } from 'react-router';

import gql from 'graphql-tag';
import fetchSongs from '../queries/fetchSongs';

class SongCreate extends Component {
  constructor(props) {
    super(props);

    this.state = { title: '' };
  }

  onSubmit(event) {
    event.preventDefault();

    this.props.mutate({
      variables: { title: this.state.title },
      refetchQueries: [{ query: fetchSongs }]
    }).then(() => hashHistory.push('/'));


  }

  render() {
    return (
      <div>
        <h4>Create a new song</h4>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Song title</label>
          <input
            onChange={event => this.setState({ title: event.target.value })}
            value={this.state.title}
          />
        </form>
        <Link
          to="/"
          className="btn blue left"
        >
          <i className="material-icons">keyboard_arrow_left</i>
        </Link>
      </div>
    );
  }
};

const mutation = gql`
  mutation AddSong ($title: String) {
    addSong(title: $title) {
      id
      title
    }
  }
`;

export default graphql(mutation)(SongCreate);
