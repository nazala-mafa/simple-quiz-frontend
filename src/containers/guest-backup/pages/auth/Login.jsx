import axios from "axios";
import { useState } from "react";
import { Card, Button, Form } from 'react-bootstrap';
import { connect } from "react-redux";
import { activateToast, authLogin } from "../../../../config/redux/action";
import { useNavigate } from 'react-router-dom';

const reduxDispatch = dispatch => ({
  toast: data => dispatch( activateToast(data) ),
  login: data => dispatch( authLogin(data) )
})

const reduxState = state => ({
  user: state.user
})

export default connect(reduxState, reduxDispatch)(function Login(props) {
  let [data, setData] = useState({
    username: '',
    password: ''
  })
  let navigate = useNavigate();

  let handleData = e => {
    setData({
      ...data, 
      [e.target.name]: e.target.value
    })
  }

  let handleSubmit = () => {
    axios.post(process.env.REACT_APP_B_SITE_URL+'/login', data)
    .then(res=>{
      props.toast({
        type: 'message',
        text: res.data.message
      })
      props.login(res.data.data)
      navigate('/')
    })
    .catch(function(err){
      props.toast({
        type: 'errors',
        text: err.response.data.messages
      })
    })
  }
  
  return (
    <>
      <div>
        <Card>
          <Card.Body>
            <Form.Group className="mb-3" controlId="1">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" name="username" onChange={handleData} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="2">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" onChange={handleData} />
            </Form.Group>
            <div className="d-grid gap-2">
              <Button variant="primary" onClick={handleSubmit} >Masuk</Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  )
})