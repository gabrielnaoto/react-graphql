import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import fetchSong from '../queries/fetchSong';

class LyricCreate extends Component {
  constructor(props) {
    super(props);

    this.state = { content: '' };
  }

  onSubmit = (event) => {
    this.props.mutate({
      variables: {
        content: this.state.content,
        songId: this.props.songId
      }
    }).then(() => {
      this.setState({ content: '' })
    });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <label>Add a lyric</label>
        <input
          value={this.state.content}
          onChange={event => {
            this.setState({ content: event.target.value })
          }}
        />
      </form>
    );
  }
}

const mutation = gql`
  mutation AddLyricToSong ($content: String, $songId: ID!){
    addLyricToSong(songId: $songId, content: $content) {
      id
      title
      lyrics {
        id
        content
        likes
      }
    }
  }
`;

export default graphql(mutation)(LyricCreate);
