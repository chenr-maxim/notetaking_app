import React from 'react';
import moment from 'moment';
import {logoutUser} from './util/auth_user';

import api from '../api/index'
import {Editor, EditorState, convertFromRaw, convertToRaw } from 'draft-js';

export class NoteInterface extends React.Component {    
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            rawContentStateData: '',
            userData: [],
            userNotes: [],
            noteTitle: '',
            noteContent: '',
            divToFocus: '',
            emptyFlag: true,
            editorState: EditorState.createEmpty(),
        };
        this.onChange = editorState => this.setState({editorState});

    }

    componentDidMount() {
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    changeNote = (i) => {
        if(this.state.userNotes.length === 0) {
            return;
        } else {
            const {noteTitle, noteContent} = this.state.userNotes[i];
            return() => {
                this.setState({noteTitle, noteContent, divToFocus: i });
            }
        }
    }

    lastEditTime = () => {
        const currentTime = moment().format("MMMM Do. h:mma");
        this.setState(oldState => ({lastEditTime: currentTime}));
    }

    addNewNote = async() => {
        await this.lastEditTime();
        await this.convertToRawData();
        const note = {
            title: this.state.noteTitle, 
            content: this.state.noteContent, 
            lastEditTime: this.state.lastEditTime,
            rawContentStateData: this.state.rawContentStateData
        };
        this.state.userData.notes.push(note);
        this.updateUser();

    }

    updateUser = async() => {
        const {_id, username} = this.state.userData;
        const userNotes = this.state.userNotes;
        const payload = {userNotes, username, _id};
        await api.updateUser(_id, payload).then(res => {
            console.log('updated user into DB');
        })
        this.forceUpdate();
    }

    deleteNote = () => {
        this.state.userNotes.splice(this.state.divToFocus, 1);
        console.log(this.state.userNotes);
        this.updateUser();
    }

    // saveNote = () => {
    //     if(this.state.noteTitle.trim() !== '') {
    //         //notes === length 0
    //         //notes is empty
    //         //base case
    //         if(notes.length === 0) {
    //             if(this.state.noteTitle.trim() !== '') {
    //                 this.updateNotes();
    //                 return;
    //             }
    //             else {
    //                 alert('enter a note title to save!');
    //             }
    //         }
    //         //notes !=== length 0
    //         //notes is not empty
    //         if(notes.length !== 0) {
    //             for(let i = 0; i < notes.length; i++) {
    //                 if(notes[i].noteTitle === this.state.noteTitle.trim()) {
    //                     notes.splice(i, 1);
    //                     break;
    //                 } 
    //             }
    //             this.updateNotes();
    //         }
    //     } else {
    //         alert('enter a title to save the note!');
    //     }
    // }

    createNote = () => {
        this.setState({ noteTitle: '', noteContent: ''}, () => {
            this.lastEditTime();
        });
    }

    getUserFromDB = async () => {
        const username = this.state.username;
        await api.getUser().then(res => {
            for(let i = 0; i < res.data.data.length; i++) {
                if((res.data.data)[i].username === username) {
                    console.log('success');
                    this.setState({userData: (res.data.data)[i], emptyFlag: false});
                    this.setState({userNotes: this.state.userData.notes});
                    return;
                }
            }
        })
    }
    
    checkState = () => {
        console.log(this.state);
    }

    convertToRawData = () => {
        const contentState = this.state.editorState.getCurrentContent();
        var RawState = convertToRaw(contentState);
        this.setState({rawContentStateData: RawState});
    }

    convertFromRawMethod = () => {
        const rawData = this.state.rawContentStateData;
        var convertedData =convertFromRaw(rawData);
        console.log(convertedData);
        let text = convertedData.getPlainText();
        console.log(text);
    }

    logout = () => {
      logoutUser();
    }

    render() {
        return (
            <div className="noteContainer">
                <div className="notesTab"> 
                    <div className="searchBarContainer">
                        <span className="magnifyingGlass">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
                            <g id="Search" transform="translate(3)">
                                <rect id="Rectangle_693" data-name="Rectangle 693" fill="none"/>
                                <path id="Path_208" data-name="Path 208" d="M12,10.943,9.509,8.453a5.167,5.167,0,0,0,1.057-3.17A5.251,5.251,0,0,0,5.283,0,5.251,5.251,0,0,0,0,5.283a5.251,5.251,0,0,0,5.283,5.283,5.167,5.167,0,0,0,3.17-1.057L10.943,12ZM1.509,5.283A3.737,3.737,0,0,1,5.283,1.509,3.737,3.737,0,0,1,9.057,5.283,3.737,3.737,0,0,1,5.283,9.057,3.737,3.737,0,0,1,1.509,5.283Z" transform="translate(-3)" fill="#2699fb"/>
                            </g>
                            </svg>
                        </span>
                        <input type="text" className="searchBar"></input>
                    </div>
                    <button className="createIcon" onClick={this.createNote}> 
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
                    <button onClick={this.getUserFromDB}> get user from the DB </button>
                    <button onClick={this.updateUser}> update User </button>
                    <button onClick={this.convertToRawData}> content state </button>
                    <button onClick={this.convertFromRawMethod}> convert from raw </button>
                    <button onClick={this.logout}> logout </button>


                    <hr className="solid"></hr>
                    <div className="savedNotes">
                        {
                            !(this.state.emptyFlag) ? this.state.userData.notes.map((note, i) => {
                                return <div onClick={this.changeNote(i)} className={this.state.divToFocus === i ? 'individualNote activeNote': 'individualNote'} key={i}> 
                                    <div className="timeStamp">
                                        {note.lastEditTime}
                                    </div>
                                    <div className="individualNoteTitle">
                                        {note.title}
                                    </div>
                                    <div className="individualNoteContent">
                                        {note.content}
                                    </div>
                                </div>
                            }): false
                        }
                    </div>
                    <button onClick={this.checkState}> Check State </button>
                </div>


                <div className="noteEditor">
                    <input type="text" placeholder="Enter a Title" value={this.state.noteTitle || ""} className="noteTitle" name="noteTitle" onChange={this.handleChange} />
                    <button className="saveIcon" onClick={this.addNewNote}>
                        <svg id="software-download" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                        <path id="Path_1231" data-name="Path 1231" d="M11,5a1,1,0,0,1,2,0v7.158l3.243-3.243,1.414,1.414L12,15.986,6.343,10.329,7.757,8.915,11,12.158Z" transform="translate(-4 -4)"/>
                        <path id="Path_1232" data-name="Path 1232" d="M4,14H6v4H18V14h2v4a2,2,0,0,1-2,2H6a2,2,0,0,1-2-2Z" transform="translate(-4 -4)"/>
                        </svg>
                    </button>
                    <button className="deleteIcon" onClick={this.deleteNote}>
                        <svg id="trash" xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 19 19">
                        <path id="Path_1347" data-name="Path 1347" d="M17,5V4a2,2,0,0,0-2-2H9A2,2,0,0,0,7,4V5H4A1,1,0,0,0,4,7H5V18a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V7h1a1,1,0,0,0,0-2ZM15,4H9V5h6Zm2,3H7V18a1,1,0,0,0,1,1h8a1,1,0,0,0,1-1Z" transform="translate(-3 -2)" fill="#2699fb" fillRule="evenodd"/>
                        <path id="Path_1348" data-name="Path 1348" d="M9,9h2v8H9Z" transform="translate(-3 -2)" fill="#2699fb"/>
                        <path id="Path_1349" data-name="Path 1349" d="M13,9h2v8H13Z" transform="translate(-3 -2)" fill="#2699fb"/>
                        </svg>
                    </button>
                    <Editor placeholder='Begin typing here' editorState={this.state.editorState} onChange={this.onChange} />
                    <textarea autoFocus name="noteContent" value={this.state.noteContent || ""} placeholder="Start typing here!"  rows="20" cols="50" required onChange={this.handleChange} ></textarea> 
                </div>          
            </div>
            
        );
    }
}
