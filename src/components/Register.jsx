import React, { useState } from "react";
import {
  Form,
  FormText,
  FormGroup,
  FormFeedback,
  Button,
  Input,
  Label,
} from "reactstrap";
import {useMutation} from 'react-query'
import { checkUsername, checkEmail, register } from "./getData";
import { validate } from 'react-email-validator';
import {useNavigate} from 'react-router-dom'



 
export const Register = () => {
  const navigate=useNavigate('')
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [email,setEmail] = useState('')
    const [isValidU,setIsValidU] = useState(null)
    const [isValidP,setIsValidP] = useState(null)
    const [isValidE,setIsValidE] = useState(null)
    const [success,setSucces] = useState(null)
    const [msg,setMsg] = useState('')

    const mutationCheckUsername=useMutation(checkUsername,{
      onSuccess:(data)=>{
        console.log('szerver oldalrol',data.data.rowCount,data.data.username)
        if(data.data.rowCount ==  0)
         setIsValidU(true)
        else
        setIsValidU(false)
        }
    })
    const mutationCheckRegister=useMutation(register,{
      onSuccess:(data)=>{
        if(data.data?.id){
        setSucces(true)
        setUsername('')
        setPassword('')
        setEmail('')
        setIsValidP(null)
        setIsValidE(null)
        setIsValidU(null)
      }
        else{
          setSucces(false)
          
        }
        setMsg(data.data.msg)
          }
        
    })

    const handleCheckUsername = ()=>{
      if(username)
        mutationCheckUsername.mutate({username:username})
      else
      setIsValidU(false)
    }

    const mutationCheckEmail=useMutation(checkEmail,{
      onSuccess:(data)=>{
        console.log('szerver oldalrol',data.data.rowCount,data.data.email)
        if(data.data.rowCount ==  0)
         setIsValidE(true)
        else
        setIsValidE(false)
        }
    })

    const handleCheckEmail = ()=>{
      if(validate(email))
        mutationCheckEmail.mutate({email:email})
      else
      console.log('kliens oldalt ellenőrzés!')
      setIsValidE(false)
    }
    const handleCheckPassword = ()=>{
      password.length<6 ? setIsValidP(false) : setIsValidP(true)
    }

  return (
    <Form className="loginpanel p-3 border shadow mt-3">
      <h1 className="mb-5">Register</h1>
      <FormGroup>
        <Label for="username">Username</Label>
        <Input className={isValidU==null ? "" :(isValidU ? "is-valid" : "is-invalid")}
          onBlur={handleCheckUsername}
          onKeyPress={(e)=>e.key=="Enter"? document.getElementById("email").focus() : ''}
         autoFocus value={username} onChange={(e)=>setUsername(e.target.value)} />
        <FormFeedback>This username already used!</FormFeedback>
      </FormGroup>
 
      
 
      <FormGroup>
        <Label for="email">Email</Label>
        <Input id="email" className={isValidE==null ? "" :(isValidE ? "is-valid" : "is-invalid")} value={email} onChange={(e)=>setEmail(e.target.value)}
        onBlur={handleCheckEmail}
        onKeyPress={(e)=>e.key=="Enter"? document.getElementById("password").focus() : ''} />
        <FormFeedback>This email address already used or wrong email!</FormFeedback>
        <FormText>
          <ul className="important">
            <li>Must be contain '@' character</li>
          </ul>
        </FormText>
      </FormGroup>
      <FormGroup>
        <Label for="password">Password</Label>
        <Input type="password" id="password" className={isValidP==null ? "" :(isValidP ? "is-valid" : "is-invalid")} onBlur={handleCheckPassword} value={password} onChange={(e)=>setPassword(e.target.value)} />
        <FormFeedback >Password incorrect!</FormFeedback>
        <FormText>
          <ul className="important">
            <li>Minimum 6 character!</li>
          </ul>
        </FormText>
      </FormGroup>
      <div className="text-center">
      <Input type="button" className="btn btn-dark" disabled={!isValidP || !isValidU || !isValidE}
      onClick={()=>mutationCheckRegister.mutate({username:username,email:email,password:password})}
      value="Sign Up"
      
      />
      </div>
      <div className="msg">{msg}</div>

      {success && <div className="btn btn-outline-dark" onClick={()=>navigate('/login')}>jelentkezz be</div>}
    </Form>
  );
};
 
