import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { Button, Label, Icon } from 'semantic-ui-react';

import { LIKE_POST_MUTATION } from '../util/graphql'

import MyPopup from './MyPopup'

const LikeButton = ({ user, post: { id, likeCount, likes }}) => {
    const [liked, setLiked] = useState(false)

    useEffect(() => {
        if (user && likes.find((like) => like.username === user.username)) {
          setLiked(liked => true);
        } else setLiked(liked => false);
    }, [user, likes]);

    const [likePost] = useMutation(LIKE_POST_MUTATION, {
        variables: { postId: id }
    });

    const likeButton = user ? (
        liked ? (
          <Button color="teal">
            <Icon name="heart" />
          </Button>
        ) : (
          <Button color="teal" basic>
            <Icon name="heart" />
          </Button>
        )
      ) : (
        <Button as={Link} to="/login" color="teal" basic>
          <Icon name="heart" />
        </Button>
    );

    return (
        <Button as="div" labelPosition="right" onClick={user ? likePost : null}>
          <MyPopup content={liked ? 'Unlike' : 'Like'}>{likeButton}</MyPopup>
          <Label basic color="teal" pointing="left">
            {likeCount}
          </Label>
        </Button>
    );
}

export default LikeButton