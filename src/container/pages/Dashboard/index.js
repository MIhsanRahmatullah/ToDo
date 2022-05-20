import React, {Component, Fragment} from "react";
import { addDataToAPI, deleteDataFromAPI, getDataFromAPI, updateDataFromAPI } from "../../../config/redux/action";
import './Dashboard.css';
import { connect } from "react-redux";

class Dashboard extends Component{
    state = {
        title: '',
        content: '',
        hours:'',
        minuts: '',
        date: '',
        day:'',
        year:'',
        textButton: 'SAVE',
        noteId: ''
    }

    componentDidMount(){
        const userData = JSON.parse(localStorage.getItem('userData'));
        this.props.getNotes(userData.uid);
    }

    handleSaveNotes = () =>{
        const {title, content, textButton, noteId} = this.state;
        const {saveNotes, updateNotes} = this.props;
        const userData = JSON.parse(localStorage.getItem('userData'))
        const data = {
            title: title,
            content: content,
            hours: new Date().getHours(),
            minuts: new Date().getMinutes(),
            date: new Date().getDate(),
            year: new Date().getFullYear(),
            day: new Date().getDay(),
            userId: userData.uid
        }
        if(textButton ==="SAVE"){
            saveNotes(data);
        }else {
            data.noteId = noteId;
            updateNotes(data)
        }
        console.log(data);
    }

    onInputChange = (e, type) => {
        this.setState({
            [type] : e.target.value
        })
    }

    updateNotes = (note) =>{
        console.log(note)
        this.setState({
            title: note.data.title,
            content: note.data.content,
            textButton: 'UPDATE',
            noteId: note.id
        })
    }

    cancleUpdate = () => {
        this.setState({
            title: "",
            content: '',
            textButton: 'SAVE'
        })
    }
    
    deleteNote = (e, note) =>{
        e.stopPropagation();
        const {deleteNote} = this.props;
        const userData = JSON.parse(localStorage.getItem('userData'))
        const data = {
            userId: userData.uid ,
            noteId: note.id
        }
        deleteNote(data)
    }

    render(){
        const{title, content, textButton} =this.state;
        const {notes} = this.props;
        const {updateNotes, handleSaveNotes, cancleUpdate, onInputChange, deleteNote} = this;
        console.log('notes: ', notes)
        return(
            <div className="all">
                <div className="form">
                    <h3>Notes</h3>
                    <input placeholder="title" className="inputTitle" value={title} onChange={(e) => onInputChange(e, 'title')} />
                    <textarea placeholder="content" className="inputContent" value={content} onChange={(e) => onInputChange(e, 'content')}/>
                    <button className="buttonSimpan" onClick={handleSaveNotes}>{textButton}</button>
                    {
                        textButton === 'UPDATE' ? (
                            <button className="buttonCancel" onClick={cancleUpdate}>CANCEL</button>
                        ) : null
                    }
                </div>
                <hr/>
                {
                    notes.length > 0 ? (
                        <Fragment>
                            {
                                notes.map(note =>{
                                    return(
                                    <div className="card" key={note.id} onClick={() =>updateNotes(note)}>
                                        <p className="Title">{note.data.title}</p>
                                        <div className="Date">
                                            <p className="jam">{note.data.hours}</p>
                                            <p className="minuts">:{note.data.minuts}</p>
                                            <p className="hari">{note.data.date}</p>
                                            <p className="tanggal">/{note.data.day}</p>
                                            <p className="tahun">/{note.data.year}</p>
                                        </div>
                                        <p className="Content">{note.data.content}</p>
                                        <button className="buttonDelete" onClick={(e) => deleteNote(e, note)}>X</button>
                                    </div>
                                    )
                                })
                            }
                        </Fragment>
                    ) : null
                }
            </div>
        )
    }
} 

const reduxState = (state) =>({
    userData: state.user,
    notes: state.notes
})

const reduxDispatch = (dispatch) => ({
    saveNotes: (data) => dispatch(addDataToAPI(data)),
    getNotes: (data) => dispatch(getDataFromAPI(data)),
    updateNotes: (data) => dispatch(updateDataFromAPI(data)),
    deleteNote: (data => dispatch(deleteDataFromAPI(data)))
})

export default connect (reduxState, reduxDispatch)(Dashboard);