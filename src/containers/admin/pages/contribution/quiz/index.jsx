import axios from "axios"
import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { auth_header, server_url } from "../../../../../config/env"
import QuestionCard from "./section/card"

export default function Quiz() {
  let { id } = useParams()
  let [quizData, setQuizdata] = useState({})
  let [questions, setQuestions] = useState([])

  const fetchQuestions = () => {
    axios.get(server_url + 'quiz/question?quiz_id=' + id, auth_header).then(res => {
      setQuestions(Object.entries(res.data))
    })
  }

  useEffect(() => {
    axios.get(server_url + 'quiz?id=' + id).then(res => {
      setQuizdata(res.data)
      fetchQuestions()
    })
    // eslint-disable-next-line
  }, [id])

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="text-capitalize mt-3">{quizData.title}</h2>
        <div>
          <Link to={`/admin/kontribusi/quiz/${id}/new`} className="btn btn-primary">Tambah Soal</Link>
        </div>
      </div>
      <div className="row">
        {questions.map((q, i) => <QuestionCard data={q} key={i} />)}
      </div>
    </>
  )
}