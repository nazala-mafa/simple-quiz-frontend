import { Card } from "react-bootstrap";

export default function QuestionCard({ data, key }) {
  let [no, dat] = data
  return (
    <div className="col-12 col-sm-6 col-lg-4" key={key}>
      <Card className="border-info">
        <Card.Body>
          <Card.Text>
            <div className="d-flex justify-content-between align-items-center py-2">
              <h6><strong>#{no}.</strong></h6>
              <div>
                <button className="btn-warning text-white btn-sm me-3">edit</button>
                <button className="btn-danger text-white btn-sm">hapus</button>
              </div>
            </div>
            <p className="border rounded p-2 border-info">{dat.question}</p>
            <h6>Jawaban:</h6>
            <ul className="list-group">
              {dat.answers.map(answer => (
                <li className={`list-group-item d-flex justify-content-between align-items-center border-info`}>
                  <p className="mb-0">{answer.answer}</p>
                  <div>{answer.is_true === '1' ? <span class="badge bg-primary rounded-pill">benar</span> : null}</div>
                </li>
              ))}
            </ul>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  )
}