import React from 'react';
import './noteEditor.css';
import {Editor, EditorState} from 'draft-js';

class NoteEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
            noteContent: '',
            noteTitle: ''
        };
        this.onChange = editorState => this.setState({editorState: editorState, noteContent: editorState.getCurrentContent().getPlainText()});
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleData = () =>{
        // const plainText = this.state.editorState.getCurrentContent().getPlainText();
        // console.log(this.state.editorState.getCurrentContent().getPlainText());
        // this.setState({noteContent: plainText});
        this.props.parentCallback(this.state);
    }

    checkState = () => {
        console.log(this.state);
    }

    render() {
        return(
            <div className={'noteEditor-editor'}>
                <input type="text" placeholder="Enter a Title" value={this.state.noteTitle || ""} className="noteTitle" name="noteTitle" onChange={this.handleChange} />
                <Editor placeholder='Begin typing here' editorState={this.state.editorState} onChange={this.onChange} />
                <button onClick={this.checkState}>  Check state </button>
                <button onClick={this.handleData}>  Save </button>
            </div>
        )
    };
}

export default NoteEditor;