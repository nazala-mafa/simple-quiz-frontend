import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useState } from 'react';
import axios from 'axios';
import { server_url } from '../../../../../config/env';

const reduxState = state => ({
  user: state.user
})

export default connect(reduxState)(NewQuiz)

function NewQuiz(props) {
  let [inputNum, setInputNum] = useState(2)
  let [inputsAnswer, setInputsAsnwer] = useState([<InputAnswer num={1} delInput={() => handleDeleteAnswer(1)} />])
  let navigate = useNavigate();
  let { id: quiz_id } = useParams();
  let { user_id } = props.user

  const handleFormSubmit = (e) => {
    e.preventDefault()
    let formData = new FormData(e.target)
    let { question, answers } = getFormData(formData)
    axios.post(server_url + 'quiz/question', { quiz_id, user_id, question },
      { headers: { "Authorization": `Bearer "${localStorage.getItem('token')}"` } }).then(res => {
        let question_id = res.data.data.question_id
        answers.map(answer => answer.question_id = question_id)
        axios.post(server_url + 'quiz/answer', answers,
          { headers: { "Authorization": `Bearer "${localStorage.getItem('token')}"` } }).then(res => {
            navigate(-1)
          })
      })
  }

  const handleAddAnswer = () => {
    let inputs = inputsAnswer
    inputs.push(<InputAnswer num={inputNum} delInput={() => handleDeleteAnswer(inputNum)} />)
    setInputsAsnwer(inputs)
    setInputNum(inputNum + 1)
  }

  const handleDeleteAnswer = id => {
    setInputsAsnwer(inputsAnswer => inputsAnswer.filter(i => i.props.num !== id))
  }

  useEffect(() => {

  }, [])

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mt-3">
        <h1>Tambah Quiz</h1>
        <div><button className="btn btn-primary" onClick={() => { navigate(-1) }}>Back</button></div>
      </div>
      <div className="row">
        <div className="col">
          <form onSubmit={handleFormSubmit}>
            <div className="mb-3">
              <label htmlFor="question" className="form-label">Soal:</label>
              <textarea name="question" id="question" rows="4" className='form-control' required></textarea>
            </div>
            {inputsAnswer.map(inputs => inputs)}
            <div className="mb-3 d-flex justify-content-between">
              <button type='button' className="btn btn-info text-white" onClick={handleAddAnswer}>Tambah Jawaban</button>
              <button type='submit' className="btn btn-primary">Simpan</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

function InputAnswer({ num, delInput }) {
  return (
    <div className="mb-3 border p-3 rounded-3" key={num}>
      <div className="d-flex justify-content-between mb-1">
        <label htmlFor={'answer-' + num}>Jawaban {(num === 1) ? 'benar' : 'salah'}</label>
        {(num !== 1) ? <button type='button' className="btn btn-sm btn-danger" onClick={() => delInput(num)}>delete</button> : null}
      </div>
      <input type="text" name={`answer-${num}`} id={'answer-' + num} className='form-control' placeholder={`isi jawaban ${(num === 1) ? 'benar' : 'salah'}`} required />
    </div>
  )
}

function getFormData(form) {
  let data = {}
  for (let [key, value] of form.entries()) {
    if (key.slice(0, 6) === 'answer') {
      if (data['answers']) {
        data['answers'].push({ is_true: 0, answer: value })
      } else {
        data['answers'] = [{ is_true: 1, answer: value }]
      }
    } else {
      data[key] = value
    }
  }
  return data
}