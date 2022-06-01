import axios from "axios";
import { useState } from "react";
import { Card, Button, Form } from 'react-bootstrap';
import { connect } from "react-redux";
import { activateToast, authLogin } from "../../../config/redux/action";
import { useLocation, useNavigate } from 'react-router-dom';
import { server_url } from "../../../config/env";
import MessageBlock from "../../templates/MessageBlock";

const reduxDispatch = dispatch => ({
  toast: data => dispatch(activateToast(data)),
  login: data => dispatch(authLogin(data))
})

const rState = state => ({
  user: state.user
})
export default connect(rState, reduxDispatch)(function Login(props) {
  let [data, setData] = useState({
    username: '',
    password: ''
  })
  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";

  let handleData = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  let handleSubmit = () => {
    axios.post(server_url + 'login', data)
      .then(res => {
        props.toast({
          type: 'message',
          text: res.data.message
        })
        props.login(res.data.data).then(res => {
          if (res) navigate(from, { replace: true });
        })
      })
      .catch(function (err) {
        console.log(err.response.data.messages.error);
        props.toast({
          type: 'errors',
          text: err.response.data.messages
        })
      })
  }

  let header = (from !== '/') ? <Card.Header><p className="m-0">Login untuk mengakses {from}</p></Card.Header> : '';
  return (
    <>
      <div className="mt-3">
        <MessageBlock />
        <Card>
          {header}
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