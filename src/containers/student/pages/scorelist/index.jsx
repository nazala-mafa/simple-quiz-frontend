import axios from "axios";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { server_url } from "../../../../config/env";

const reduxState = state => ({
  user: state.user
})

export default connect(reduxState)(ScoreList)

function ScoreList(props) {
  let [recentScore, setRecentScore] = useState(null)
  let [scores, setScores] = useState(null)

  useEffect(()=>{
    setRecentScore( localStorage.getItem('recent-score') )
    localStorage.removeItem('recent-score')
    axios.get(server_url+'score/show/'+props.user.id, {
      headers: { "Authorization": `Bearer "${localStorage.getItem('token')}"` }
    }).then(res=>{
      if( res.data.length ) setScores(res.data);
    })

  }, [props])

  return <>

    {recentScore && <>
      <div className="card my-3">
        <div className="card-body text-center">
          <h4>Skor Anda</h4>
          <h3>{ recentScore * 100 }</h3>
        </div>
      </div>
    </>}

    <table className="table mt-3">
      <thead>
        <tr>
          <th>#</th>
          <th>Judul Quiz</th>
          <th>Skor</th>
          <th>Tanggal</th>
        </tr>
      </thead>
      <tbody>
        {scores ? scores.map((score, i)=>(
          <tr key={i}>
            <td>{i+1}</td>
            <td>{score.title}</td>
            <td>{score.score*100}</td>
            <td>{score.created_at}</td>
          </tr>
        )) : <tr>
          <td colSpan={4}>Data Kosong</td>
        </tr>}
      </tbody>
    </table>
  </>
}