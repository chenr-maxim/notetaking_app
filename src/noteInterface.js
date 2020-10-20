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
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    changeNote = (event) => {
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
    }

    deleteNote = () => {
        const noteTitle = this.state.noteTitle;
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
                for(let i = 0; i < notes.length; i++) {
                    if(notes[i].noteTitle === this.state.noteTitle.trim()) {
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
            // console.log('componentDidMount Notes exist in localStorage');
            // console.log(parsedNotes);
            // console.log('what is stored in localstorage?');
            // console.log(localStorage);
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
                <div className="notesTab"> 
                    <div className="searchBarContainer">
                        <span class="magnifyingGlass">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
                            <g id="Search" transform="translate(3)">
                                <rect id="Rectangle_693" data-name="Rectangle 693" fill="none"/>
                                <path id="Path_208" data-name="Path 208" d="M12,10.943,9.509,8.453a5.167,5.167,0,0,0,1.057-3.17A5.251,5.251,0,0,0,5.283,0,5.251,5.251,0,0,0,0,5.283a5.251,5.251,0,0,0,5.283,5.283,5.167,5.167,0,0,0,3.17-1.057L10.943,12ZM1.509,5.283A3.737,3.737,0,0,1,5.283,1.509,3.737,3.737,0,0,1,9.057,5.283,3.737,3.737,0,0,1,5.283,9.057,3.737,3.737,0,0,1,1.509,5.283Z" transform="translate(-3)" fill="#2699fb"/>
                            </g>
                            </svg>
                        </span>
                        <input type="text" className="searchBar"></input>
                    </div>
                    <button className="createNoteButton" onClick={this.createNote}> 
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
                            <g id="Group_242" data-name="Group 242" transform="translate(1.357 0.404)">
                            <g id="Group_220" data-name="Group 220" transform="translate(-1.357)">
                            <g id="Add">
                                <path id="Union_1" data-name="Union 1" d="M5.375,11V6.188H0V4.812H5.375V0h1.25V4.812H12V6.188H6.625V11Z" transform="translate(0 -0.404)" fill="#2699fb"/>
                            </g>
                            </g>
                        </g>
                        </svg>
                    </button>
                    <hr class="solid"></hr>
                    <div className="savedNotes">
                        { (!emptyFlag) ? notes.map((note, i) => {return <div onClick={this.changeNote} className="individualNote" key={i}> {note.noteTitle} </div>}) : false}
                        <button onClick={this.clearNotes}> Clear Notes </button>
                        {/* <button onClick={this.checkState}> check state </button> */}
                    </div>
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
