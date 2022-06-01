import { Modal, Button, Table, Form } from 'react-bootstrap';
import { useState } from 'react';

function Quiz() {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    desc: ''
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    console.log( formData )
  }
  const handleSubmit = () => {
    fetch(process.env.REACT_APP_B_SITE_URL+'/home/coba', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }).then(res=>{
      return res.json()
    }).then(data=>{
      console.log( data )
    })
  }

  return (
    <>
      <div className="row">
        <div className="card">
          <div className="card-header d-flex justify-content-between">
            <h4>Daftar Quiz</h4>
            <Button variant="primary" onClick={handleShow}>
              Launch demo modal
            </Button>
          </div>
          <div className="card-body">
          <h3>{process.env.REACT_APP_B_SITE_URL}</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Judul</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
              </tr>
            </tbody>
          </Table>

          </div>
        </div>
      </div>
      
      
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="">
            <Form.Label>Judul</Form.Label>
            <Form.Control type="text" name="title" onChange={handleData} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="">
            <Form.Label>Deskripsi (opsional)</Form.Label>
            <Form.Control as="textarea" rows={3} name="desc" onChange={handleData} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Quiz;