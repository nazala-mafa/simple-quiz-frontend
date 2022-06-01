import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { server_url } from "../../../../config/env";

export default function User() {
  let [murid, setMurid] = useState([])

  useEffect(()=>{
    axios.get(server_url+'users', 
      { headers: { "Authorization": `Bearer "${localStorage.getItem('token')}"` } }
    ).then(res=>{
      let murid_ = []; 
      for (const data of res.data) {
        if( data.group_name === 'student' )
          murid_.push(data);
      }
      setMurid(murid_)
    })
  }, [])

  return <>
    <h5 className="mt-3">Tabel Pengguna Murid</h5>
    <RenderTable datas={murid} />
  </>
}

function RenderTable({datas}){
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Nama</th>
          <th>Aktif</th>
          <th>Tindakan</th>
        </tr>
      </thead>
      <tbody>
        {datas.map((val,i) => 
          <tr>
            <td>{i+1}</td>
            <td>{val.username}</td>
            <td>{val.is_active===1?"aktif":"non-aktif"}</td>
            <td>
              <Button variant="warning" size="sm" className="text-white me-2">Edit</Button>
              <Button variant="danger" size="sm">Delete</Button>
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  )
}