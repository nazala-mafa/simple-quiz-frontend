import axios from "axios";
import { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { server_url } from "../../../config/env";
import { activateToast } from "../../../config/redux/action";
import MessageBlock from "../../templates/MessageBlock";

const reduxDispatch = dispatch => ({
  toast: data => dispatch(activateToast(data))
})

export default connect(null, reduxDispatch)(Register)

function Register(props) {
  let [username, setUsername] = useState('')
  let [email, setEmail] = useState('')
  let [password, setPassword] = useState('')
  let [passconf, setPassconf] = useState('')
  let navigate = useNavigate()

  const handleSubmit = () => {
    if( passconf !== password ) props.toast({ type: 'error', text: 'Password tidak valid' });
    axios.post(server_url+'register', { username, email, password }).then(()=>{
      navigate('/login')
    }).catch(err=>{
      props.toast({ type: 'errors', text: err.response.data.messages })
    })
  }
  return (
    <>
      <div className="mt-3">
        <MessageBlock />
        <Card>
          <Card.Body>
            <Form.Group className="mb-3" controlId="1">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" name="username" onChange={e=>setUsername(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="4">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" onChange={e=>setEmail(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="2">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" onChange={e=>setPassword(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="3">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" name="passconf" onChange={e=>setPassconf(e.target.value)} required />
            </Form.Group>
            <div className="d-grid gap-2">
              <Button variant="primary" onClick={handleSubmit} >Masuk</Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  )
}