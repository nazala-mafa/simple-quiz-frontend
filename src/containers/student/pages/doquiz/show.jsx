import axios from "axios"
import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { server_url } from "../../../../config/env"
import QuestionCard from "./section/QuestionCard"

const quizInit = {
  id: 0,
  is_active: 0,
  quiz_category_id: 0,
  title: "",
  user_id: 0
}

const reduxState = state => ({
  user: state.user
})

export default connect(reduxState) (DoQuizShow)

function DoQuizShow(props) {
  let {id} = useParams()
  let [quiz, setQuiz] = useState(quizInit)
  let [questions, setQuestions] = useState([])
  let navigate = useNavigate()

  useEffect(()=>{
    axios.get(server_url+'quiz/show/'+id, {
      headers: { "Authorization": `Bearer "${localStorage.getItem('token')}"` }
    }).then(res=>{
      setQuiz(res.data.quiz)
    })
    axios.get(server_url+'question?quiz_id='+id+'&user_id='+props.user.id, {
      headers: { "Authorization": `Bearer "${localStorage.getItem('token')}"` }
    }).then(res=>{
      setQuestions(res.data)
    })
  }, [id, props])

  const submitQuiz = () => {
    axios.get(server_url+'score/submit_quiz?user-id='+props.user.id+'&quiz-id='+id, {
      headers: { "Authorization": `Bearer "${localStorage.getItem('token')}"` }
    }).then(res=>{
      if(res.data) {
        if( res.data ) 
          localStorage.setItem('recent-score', res.data);
        navigate("/student/score")
      }
    })
  }

  return <>
    <div className="d-flex justify-content-between align-items-center">
      <h1 className="my-3">Soal Kuis {quiz.title}</h1>
      <button className="btn btn-primary" onClick={submitQuiz}>Selesai</button>
    </div>
    <div className="row">
      {Object.entries(questions).map((question, i)=> <QuestionCard data={question} key={i} />)}
    </div>
  </>
}