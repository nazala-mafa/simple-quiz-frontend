import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"

export default function QuizCard({title, id, i}) {
    return <div className="col-6 col-sm-4 col-md-3">
        <Card key={i}>
            <Card.Body className="text-center">
                <Card.Title>{title}</Card.Title>
                <Link to={`/student/quiz/${id}`} className="btn btn-primary" >Kerjakan</Link>
            </Card.Body>
        </Card>
    </div>
}