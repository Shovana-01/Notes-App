import React, { useState, useEffect } from 'react'
import {ReactComponent as Arrowleft } from '../assets/left-arrow.svg'





const NotePage = ({ match, history }) => {

    let noteId = match.params.id
    let [note, setNote] = useState(null)

    useEffect(() => {
        getNote()
    }, [noteId]) // eslint-disable-line react-hooks/exhaustive-deps


    let getNote = async () => {
        
        if(noteId === 'new') return
        let response = await fetch(`/api/notes/${noteId}/`)
        let data = await response.json()
        setNote(data)
    }

    let createNote = async () => {
        fetch(`/api/notes/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
    }



    let updateNote = async () => {
        fetch(`/api/notes/${noteId}/`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
    }



    let deleteNote = async () => {
        fetch(`/api/notes/${noteId}/`, {
            method: 'DELETE',
            'headers': {
                'Content-Type': 'application/json'
            }
        })
        history.push('/')
    }


    let handleSubmit = () => {

        if (noteId !== 'new' && !note.body) {
            deleteNote()
        } else if (noteId !== 'new') {
            updateNote() // eslint-disable-next-line
        } else if (noteId == 'new' && note.body !== null) { 
            createNote()
        }
        history.push('/')
    }

  
    return (
        <div className="note" >
            <div className="note-header">
                <h3>
                <Arrowleft onClick={handleSubmit} />
                
                </h3>
                {noteId !== 'new' ? (
                    <button onClick={deleteNote}>Delete</button>
                ) : (
                    <button onClick={handleSubmit}>Done</button>
                )}

                
            </div>
            <textarea onChange={(e) => {setNote({...note, 'body':e.target.value })}} value={note?.body}></textarea>
        </div>
    )
}

export default NotePage