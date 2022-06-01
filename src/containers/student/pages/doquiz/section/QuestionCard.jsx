import axios from "axios";
import { useState } from "react";
import { Card, ListGroup } from "react-bootstrap";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { server_url } from "../../../../../config/env";

const abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
const reduxState = state => ({
  user: state.user
})

export default connect(reduxState)(QuestionCard)

function QuestionCard(props) {
  let [no, dat] = props.data
  let {id: quiz_id} = useParams()
  let [cardAnswerId, setCardAnswerId] = useState(dat.user_answer_id)

  const addAnswer = answer => {
    setCardAnswerId(answer.answer_id)
    let post_data = {
      answer_id: answer.answer_id,
      question_id: dat.question_id,
      quiz_id,
      user_id: props.user.id
    }
    axios.post(server_url+'/score/answer', post_data)
  }

  return (
    <div className="col-12 col-sm-6 col-lg-4" key={dat.question_id}>
      <Card className="border-info my-2">
        <Card.Body>
          <Card.Text>
            <div className="d-flex justify-content-between align-items-center py-2">
              <h6><strong>#{no}.</strong></h6>
            </div>
            <p className="border rounded p-2 border-info">{dat.question}</p>
            <h6>Jawaban:</h6>
            <ListGroup>
              {dat.answers.map((answer, i) => (
                <ListGroup.Item action key={i} className={`list-group-item d-flex justify-content-between align-items-center border-info ${(answer.answer_id===cardAnswerId)?'bg-info text-white':''}`} onClick={()=>addAnswer(answer)}>
                  <p className="mb-0">{abc[i]}.</p>
                  <p className="mb-0">{answer.answer}</p>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  )
}