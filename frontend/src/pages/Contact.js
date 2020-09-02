import React, { useState } from 'react';
import '../css/Contact.css'
import axios from 'axios';
import {Button} from 'react-bootstrap';

export function Contact() {
    var [formDetails, setFormDetails] = useState(
        {nameForm:'', emailForm:'', messageForm:''}
    )
    var[email, setEmail]=useState('');
    var[name, setName]=useState('');
    var[message, setMessage]=useState('');

    function handleSubmit(e) {
        e.preventDefault();
        // setFormDetails({nameForm:'pula',emailForm:'pizda',messageForm:'coaiele'});
        console.log(formDetails);
        axios({
            method:'POST',
            url:'http://localhost:3001/sendMessage',
            data:formDetails
        }).then((res)=>{
            console.log(res.status)
            if(res.status===200){
                alert('Mesajul a fost trimis!');
                formDetails.email='';
                formDetails.message='';
                formDetails.name='';
            }else{
                alert('Mesajul nu a fost trimis, va rugam reincercati!')
            }
        })
    }

    function onNameChange(e){
        console.log(e.target.value)
        setName(e.target.value);
    }

    function onEmailChange(e){
        console.log(e.target.value)
        setEmail(e.target.value);
    }

    function onMessageChange(e){
        console.log(e.target.value)
        setMessage(e.target.value);
    }

    function onClickSendMessage(){
        setFormDetails({name,email,message});
        // console.log(formDetails);
    }
    return (
        <>
            <div className="title-wrapper">
                <h1>Contact</h1>
            </div>
            <form id="contact-form" onSubmit={handleSubmit} method="POST">
                <div className="form-group">
                    <label htmlFor="name">Nume</label>
                    <input type="text" onChange={onNameChange} value={name} className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email</label>
                    <input type="email" onChange={onEmailChange} value={email} className="form-control" aria-describedby="emailHelp" />
                </div>
                <div className="form-group">
                    <label htmlFor="message">Mesaj</label>
                    <textarea className="form-control" value={message} onChange={onMessageChange} rows="5"></textarea>
                </div>
                <button onClick={onClickSendMessage} className="btn btn-primary">Trimite</button>
            </form>
        </>
    )
}