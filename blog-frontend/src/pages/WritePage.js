import React from 'react';
import WriteActionButtonsContainer from '../containers/write/WriteActionButtonsContainer';
import Responsive from '../components/common/Responsive';
import EditorContainer from '../containers/write/EditorContainer';
import TagBoxContainer from '../containers/write/TagBoxContainer';

const WritePage = () => {
    return (
    <Responsive>
        <EditorContainer/>
        <TagBoxContainer/>
        <WriteActionButtonsContainer/>
    </Responsive>
        )
}

export default WritePage;