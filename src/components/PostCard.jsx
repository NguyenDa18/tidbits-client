import React, { useContext } from 'react';
import { Button, Card, Icon, Label, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment'

const PostCard = ({
    post: { body, createdAt, id, username, likeCount, commentCount, likes }
}) => {
    return (
        <Card fluid>
            <Card.Content>
                <Image
                    floated="right"
                    size="mini"
                    src="https://react.semantic-ui.com/images/avatar/large/molly.png"
                />
                <Card.Header>{username}</Card.Header>
                <Card.Meta as={Link} to={`/posts/${id}`}>
                    {moment(createdAt).fromNow(true)}
                </Card.Meta>
                <Card.Description>{body}</Card.Description>
                <Card.Description>{likeCount}</Card.Description>
                <Card.Description>{commentCount}</Card.Description>
            </Card.Content>
        </Card>
    )
}

export default PostCard