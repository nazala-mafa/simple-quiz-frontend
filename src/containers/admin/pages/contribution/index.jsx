import { useState } from "react";
import Categories from "./section/categories";
import QuizList from "./section/quizlist";

export default function Contribution() {
  const [quizCategory, setQuizCategory] = useState('all');
  const showQuiz = data => {
    setQuizCategory(data)
  }

  return (
    <>
      <Categories showQuiz={data => showQuiz(data)} />
      <QuizList category={quizCategory} />
    </>
  )
}