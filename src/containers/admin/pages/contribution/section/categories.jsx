import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { connect } from "react-redux";
import { server_url } from "../../../../../config/env";
import { activateToast } from "../../../../../config/redux/action";

const reduxDispatch = dispatch => ({
  toast: data => dispatch(activateToast(data))
})

export default connect(null, reduxDispatch)(function Categories(props) {
  const modalDataInit = { id: null, name: '', description: '' }
  const modalViewCreate = { type: 'create', title: 'Buat kategori baru', submitLabel: 'Tambah' }
  const modalViewUpdate = { type: 'update', title: 'Ubah kategori', submitLabel: 'Ubah' }

  const [categories, setCategories] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalView, setModalView] = useState(modalViewCreate)
  const [modalData, setModalData] = useState(modalDataInit)

  const toggleModal = () => setModalShow(!modalShow)
  const toggleAddModal = () => {
    setModalView(modalViewCreate)
    setModalData(modalDataInit)
    toggleModal()
  }
  const toggleEditModal = ({ id, name, description }) => {
    setModalView(modalViewUpdate)
    setModalData({ id, name, description })
    toggleModal()
  }
  const submitModal = () => {
    if (modalView.type === 'create') {
      axios.post(server_url + 'quiz/categories', modalData, {
        headers: { "Authorization": `Bearer "${localStorage.getItem('token')}"` },
      }).then(res => {
        toggleModal()
        fetchData()
        props.toast({ type: 'message', text: res.data.message })
      })
    } else {
      axios.put(server_url + 'quiz/categories/' + modalData.id, modalData, {
        headers: { "Authorization": `Bearer "${localStorage.getItem('token')}"` }
      }).then(res => {
        toggleModal()
        fetchData()
        props.toast({ type: 'message', text: res.data.message })
      })
    }
  }
  const handleModalInput = e => {
    setModalData({
      ...modalData,
      [e.target.name]: e.target.value
    })
  }

  const handleDelete = id => {
    axios.delete(server_url + 'quiz/categories/' + id,
      { headers: { "Authorization": `Bearer "${localStorage.getItem('token')}"` } }
    ).then(() => {
      fetchData()
      props.toast({
        type: 'message',
        text: 'data berhasil dihapus!'
      })
    })
  }

  const showQuiz = data => {
    props.showQuiz(data)
  }

  const fetchData = async function () {
    await axios.get(server_url + 'quiz/categories').then(res => {
      setCategories(res.data)
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <div className="row">
        <div className="col">
          <div className="d-flex justify-content-between mt-4">
            <h3>Tabel Kategori Quiz</h3>
            <button onClick={toggleAddModal} className="btn btn-primary">Tambah Kategori Quiz</button>
          </div>
          <Table striped bordered hover className="mt-3">
            <thead>
              <tr>
                <td>#</td>
                <td>Nama</td>
                <td>Deskripsi</td>
                <td>
                  <button className="btn btn-success btn-sm me-3" onClick={() => showQuiz('all')}>Lihat Semua Kuis</button>
                </td>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) =>
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{category.name}</td>
                  <td>{category.description || '-'}</td>
                  <td>
                    <button className="btn btn-success btn-sm me-3" onClick={() => showQuiz(category)}>Lihat Kuis</button>
                    <button className="btn btn-warning btn-sm me-3 text-white" onClick={() => toggleEditModal(category)}>Edit</button>
                    <button onClick={() => handleDelete(category.id)} className="btn btn-danger btn-sm">Delete</button>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>

      <Modal show={modalShow} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modalView.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nama Kategori</Form.Label>
              <Form.Control name="name" type="text" value={modalData.name} onChange={handleModalInput} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Deskripsi</Form.Label>
              <Form.Control name="description" as="textarea" rows={3} value={modalData.description} onChange={handleModalInput} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleModal}>
            Close
          </Button>
          <Button variant="primary" onClick={submitModal}>
            {modalView.submitLabel}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
})