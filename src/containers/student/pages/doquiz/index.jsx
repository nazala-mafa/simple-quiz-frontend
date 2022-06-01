import axios from "axios"
import { useEffect, useState } from "react"
import { server_url } from "../../../../config/env"
import QuizCard from "./section/QuizCard"

export default function DoQuiz() {
  let [someQuiz, setSomeQuiz] = useState([])
  
  useEffect(()=>{
    axios.get(server_url+'quiz').then(res=>{
      setSomeQuiz(res.data)
    })
  }, [])
  
  return (
    <>
      <h1>Kerjakan Quiz</h1>
      <div className="row">
        {someQuiz.map((val, i)=><QuizCard title={val.title} id={val.id} i={i} key={i} />)}
      </div>
    </>
  )
}