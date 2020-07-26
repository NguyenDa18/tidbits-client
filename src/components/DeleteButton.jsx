import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Button, Confirm, Icon } from 'semantic-ui-react';

import MyPopup from './MyPopup'

import { FETCH_POSTS_QUERY, DELETE_POST_MUTATION , DELETE_COMMENT_MUTATION } from '../util/graphql'

const DeleteButton = ({ postId, commentId, callback }) => {
    const [confirmOpen, setConfirmOpen] = useState(false);
    const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

    const [deletePostOrMutation] = useMutation(mutation, {
        update(proxy) {
          setConfirmOpen(false);
          if (!commentId) {
            const data = proxy.readQuery({
              query: FETCH_POSTS_QUERY
            });
            data.getPosts = data.getPosts.filter((p) => p.id !== postId);
            proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
          }
          if (callback) callback();
        },
        variables: {
          postId,
          commentId
        }
      });

      return (
        <>
            <MyPopup content={commentId ? 'Delete comment' : 'Delete post'}>
                <Button labelPosition="right">
                  <Button
                      color="red"
                      onClick={() => setConfirmOpen(true)}>
                      <Icon name="trash" style={{ margin: 0 }} />
                  </Button>
                </Button>
            </MyPopup>
            <Confirm
                header="Delete post"
                open={confirmOpen}
                onCancel={() => setConfirmOpen(false)}
                onConfirm={deletePostOrMutation}
            />
        </>
      )
}

export default DeleteButton

