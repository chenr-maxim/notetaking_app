import React from 'react';

let notes = [];
let emptyFlag = true;

class NoteInterface extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            noteTitle: '',
            noteContent: '',
        };
    }

    componentDidMount() {
        this.fetchNotes();
        console.log('finished did mount');
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    changeNote = (event) => {
        console.log(event.target.innerText);
        for(let i = 0; i < notes.length; i++) {
            if(notes[i].noteTitle === event.target.innerText) {
                this.setState({noteTitle: notes[i].noteTitle, noteContent: notes[i].noteContent});
                break;
            }
        }
    }

    updateNotes = () => {
        notes.push(this.state);
        localStorage.setItem('notes', JSON.stringify(notes));
        this.forceUpdate();
        emptyFlag = false;
        console.log(localStorage);
    }

    deleteNote = () => {
        console.log('delete note');
        const noteTitle = this.state.noteTitle;
        console.log(noteTitle);
        console.log(notes);
        for(let i = 0; i < notes.length; i++) {
            if( notes[i].noteTitle === noteTitle) {
                notes.splice(i,1);
                this.setState({noteTitle: '', noteContent: ''});
            }
        }
        localStorage.setItem('notes', JSON.stringify(notes));

    }

    saveNote = () => {
        if(this.state.noteTitle.trim() !== '') {
            //notes === length 0
            //notes is empty
            //base case
            if(notes.length === 0) {
                if(this.state.noteTitle.trim() !== '') {
                    console.log('notes is empty');
                    this.updateNotes();
                    return;
                }
                else {
                    alert('enter a note title to save!');
                }
            }

            //notes !=== length 0
            //notes is not empty
            if(notes.length !== 0) {
                console.log('notes is not empty');
                console.log(notes);
                for(let i = 0; i < notes.length; i++) {
                    if(notes[i].noteTitle === this.state.noteTitle.trim()) {
                        console.log('editing note');
                        notes.splice(i, 1);
                        break;
                    } 
                }
                this.updateNotes();
            }
        } else {
            alert('enter a title to save the note!');
        }
    }

    checkState = () => {
        console.log(this.state);
    }

    fetchNotes = () => {
        if(localStorage.getItem('notes')) {
            var retrievedNotes = localStorage.getItem('notes');
            var parsedNotes = JSON.parse(retrievedNotes);
            notes = parsedNotes;
            this.setState({noteTitle: notes[0].noteTitle, noteContent: notes[0].noteContent});
            emptyFlag = false;
            console.log('componentDidMount Notes exist in localStorage');
            console.log(parsedNotes);
            console.log('what is stored in localstorage?');
            console.log(localStorage);
        } else {
            console.log('empty localstorage');
        }
    }

    createNote = () => {
        this.setState({noteTitle: '', noteContent: ''});
    }

    clearNotes = () => {
        localStorage.clear();
        notes = [];
        this.setState({noteTitle: '', noteContent: ''});
        emptyFlag = true;
    }

    render() {
        return (
            <div className="noteContainer">
                <div className="savedNotes">
                    { (!emptyFlag) ? notes.map((note, i) => {return <div onClick={this.changeNote} className="individualNote" key={i}> {note.noteTitle} </div>}) : false}
                    <button className="createNoteButton" onClick={this.createNote}> + Note </button> 
                    <button onClick={this.clearNotes}> Clear Notes </button>
                    {/* <button onClick={this.checkState}> check state </button> */}
                </div>
                <div className="noteEditor">
                    <input type="text" placeholder="Enter a Title" value={this.state.noteTitle} className="noteTitle" name="noteTitle" onChange={this.handleChange} />
                    <button onClick={this.saveNote}> Save Note </button>
                    <button onClick={this.deleteNote}> Delete </button>
                    <textarea autoFocus name="noteContent" value={this.state.noteContent} placeholder="Start typing here!"  rows="20" cols="50" required onChange={this.handleChange} ></textarea> 
                </div>          
            </div>
            
        );
    }
}

export default NoteInterface;
