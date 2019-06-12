import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import fetchSong from '../queries/fetchSong';

class LyricList extends Component {

  onLike(id, likes) {
    this.props.mutate({
      variables: {
        id
      },
      optimisticResponse: {
        __typename: 'Mutation',
        likeLyric: {
          id,
          __typename: 'LyricType',
          likes: likes + 1
        }
      }
    });
    animateCSS(`#lyric-${id}`, 'fadeOutUp');
  }


  renderLyrics() {
    return this.props.lyrics.map(({ id, content, likes }) => {
      return (
        <li
          key={id}
          className="collection-item"
        >
          {content}
          <div className="vote-box">
            <i
              className="material-icons faster"
              onClick={() => this.onLike(id, likes)}
              id={`lyric-${id}`}
            >
              thumb_up
            </i>
            {likes}
          </div>
        </li>
      )
    })
  }

  render() {
    return (
      <ul className="collection">
        {this.renderLyrics()}
      </ul>
    );
  }
}

const mutation = gql`
  mutation LikeLyric ($id: ID!){
    likeLyric(id: $id){
      id
      content
      likes
    }
  }
`;

export default graphql(mutation)(LyricList);
