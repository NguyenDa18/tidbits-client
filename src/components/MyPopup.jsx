import { Popup } from 'semantic-ui-react';
import React from 'react';

const MyPopup = ({ content, children }) => (
    <Popup inverted content={content} trigger={children} />
)

export default MyPopup