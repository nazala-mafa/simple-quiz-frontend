import axios from "axios";
import { useEffect } from "react";
import { useState } from "react"
import { Button, Form, Modal, Table, ToggleButton } from "react-bootstrap";
import { Link } from "react-router-dom";
import { server_url } from "../../../../../config/env";

export default function QuizList({ category }) {

  const [title, setTitle] = useState('Semua Quiz');
  const [quizList, setQuizList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  const modalDataInit = { id: null, title: '', quiz_category_id: category.id, is_active: '0' }
  const modalViewCreate = { type: 'create', title: 'Buat quiz baru', submitLabel: 'Tambah' }

  const [modalShow, setModalShow] = useState(false);
  const [modalView, setModalView] = useState(modalViewCreate)
  const [modalData, setModalData] = useState(modalDataInit)

  const toggleModal = () => setModalShow(!modalShow)
  const showAddModal = () => {
    setModalView(modalViewCreate)
    setModalData(modalDataInit)
    toggleModal()
  }
  const handleModalInput = e => {
    setModalData({
      ...modalData,
      [e.target.name]: e.target.value
    })
  }
  const deleteQuiz = id => {
    axios.delete(server_url + 'quiz/delete/' + id, {
      headers: { "Authorization": `Bearer "${localStorage.getItem('token')}"` }
    }).then(() => {
      fetchData()
    })
  }
  const editQuiz = quiz => {
    setModalView({ type: 'update', title: 'Edit quiz ' + quiz.title, submitLabel: 'Ubah' })
    setModalData(quiz)
    toggleModal()
  }
  const submitModal = e => {
    e.preventDefault()
    if (modalView.type === 'create') {
      setModalData({
        ...modalData,
        quiz_category_id: category.id
      })
      axios.post(server_url + 'quiz', modalData, {
        headers: { "Authorization": `Bearer "${localStorage.getItem('token')}"` }
      }).then(() => {
        toggleModal()
        fetchData()
      })
    } else {
      axios.put(server_url + 'quiz/update/' + modalData.id, modalData, {
        headers: { "Authorization": `Bearer "${localStorage.getItem('token')}"` }
      }).then(() => {
        toggleModal()
        fetchData()
      })
    }
  }

  const fetchData = async function () {
    if (category === 'all') {
      axios.get(server_url + 'quiz').then(res => {
        setTitle('Semua Quiz')
        setQuizList(res.data)
      })
    } else {
      axios.get(server_url + 'quiz?cat=' + category.id).then(res => {
        setTitle('Daftar quiz ' + category.name)
        setQuizList(res.data)
      })
    }
    axios.get(server_url + 'quiz/categories').then(res => {
      setCategoryList(res.data)
    })
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line
  }, [category])

  let radios = [ 
    { name: 'Aktif', value: '1' },
    { name: 'Non Aktif', value: '0' } 
  ]

  return (
    <>
      <div className="d-flex justify-content-between">
        <h3>{title}</h3>
        {(category !== 'all') ? <button className="btn btn-primary" onClick={showAddModal}>tambah quiz</button> : null}
      </div>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <td>#</td>
            <td>Judul Quiz</td>
            <td>Aktif</td>
            <td>Dibuat Pada</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {quizList.map((quiz, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{quiz.title}</td>
              <td>{quiz.is_active}</td>
              <td>{quiz.created_at}</td>
              <td>
                <Link to={"quiz/" + quiz.id}><button className="btn btn btn-primary btn-sm me-3">detail</button></Link>
                <button className="btn btn-info btn-sm me-3 text-white" onClick={() => editQuiz(quiz)}>edit</button>
                <button className="btn btn btn-danger btn-sm" onClick={() => deleteQuiz(quiz.id)}>hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={modalShow} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modalView.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Judul Quiz</Form.Label>
              <Form.Control name="title" type="text" value={modalData.title} onChange={handleModalInput} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Kategori</Form.Label>
              <Form.Control name="quiz_category_id" as="select" value={modalData.quiz_category_id} onChange={handleModalInput} required >
                <option value="" selected hidden disabled>pilih salah satu</option>
                {categoryList.map((cat, i) => (
                  <option key={i} value={cat.id}>{cat.name}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              {radios.map((radio, i)=>(
                <ToggleButton  key={i} id={`radio-${i}`} type="radio" variant="outline-primary" size="sm" className="me-3" name="is_active" value={radio.value} checked={modalData.is_active === radio.value} onChange={handleModalInput} required>
                  {radio.name}
                </ToggleButton>
              ))}
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
}