import React from 'react';
import {Editor, EditorState} from 'draft-js';
import 'draft-js/dist/Draft.css';

class MyEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {editorState: EditorState.createEmpty()};
    }
    render() {
        return (
            <Editor editorState={this.state.editorState} onChange={this.onChange} />
        );
    }
    onChange=(editorState)=>{
        this.setState({editorState});
    }
}

export default MyEditor;