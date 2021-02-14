import React from 'react';
import Editor from '../components/write/Editors';
import TagBox from '../components/write/TagBox';
import Responsive from '../components/common/Responsive';

const PostPage = () => {
    return (
    <Responsive>
        <Editor/>
        <TagBox/>
    </Responsive>
        )
}

export default PostPage;