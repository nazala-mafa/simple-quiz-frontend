import React, {useState} from 'react';
import { Button, Toast } from 'react-bootstrap';


function Kontribusi() {

  const [show, setShow] = useState(false);

  

  return (

    <div className="container">

        <h1>React Bootstrap Toast Example - ItSolutionStuff.com</h1>

  

        <Toast onClose={() => setShow(false)} show={show} delay={2000} autohide>

          <Toast.Header>

            <strong className="mr-auto">Bootstrap Toast</strong>

            <small>11 mins ago</small>

          </Toast.Header>

          <Toast.Body>This is simple Bootstrap Toast Example</Toast.Body>

        </Toast>

  

        <Button onClick={() => setShow(true)}>Click to Show Toast</Button>

  

    </div>

  );

}

  

export default Kontribusi;