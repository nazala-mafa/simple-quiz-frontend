import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { connect } from "react-redux";
import { auth_header, server_url } from "../../../../config/env";
import { activateToast } from "../../../../config/redux/action";
import MessageBlock from "../../../templates/MessageBlock";

const reduxDispatch = dispatch => ({
  toast: data => dispatch(activateToast(data))
})

export default connect(null, reduxDispatch)(User)

function User(props) {
  let [murid, setMurid] = useState([]);
  let [showAddUserForm, setShowAddUserForm] = useState(false)

  const getUsers = () => {
    axios.get(server_url + "users", auth_header).then((res) => {
      let murid_ = [];
      for (const data of res.data) {
        if (data.group_name === "student") murid_.push(data);
      }
      setMurid(murid_);
    });
  };

  const activateUser = (id, is_active) => {
    axios
      .post(server_url + "users/activation", { id, is_active }, auth_header)
      .then(res => {
        props.toast({type: 'message', text: res.data.message})
        getUsers()
      });
  };

  const deleteUser = (id) => {
    if(window.confirm('apakan anda yakin?')){
      axios.delete(server_url+'users/'+id, auth_header ).then(res=>{ 
        props.toast({type: 'message', text: res.data.message})
        getUsers() 
      })
    }
  };

  const submitCreateUser = (e) => {
    e.preventDefault();
    const formDatas = new FormData(e.target);
    let data = {};
    for (var formData of formDatas.entries()) {
      data[formData[0]] = formData[1];
    }
    axios.post(server_url+'users/new', data, auth_header).then(res=>{
      props.toast({type: 'message', text: res.data.message})
      setShowAddUserForm(false)
      getUsers()
    })
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
    <MessageBlock />
      <div className="d-flex justify-content-between">
        <h5 className="mt-3">Tabel Pengguna Murid</h5>
        <Button onClick={() => setShowAddUserForm(!showAddUserForm)} className="my-2">{ showAddUserForm ? 'Sembunyikan' : 'Tambah User' }</Button>
      </div>
      { showAddUserForm && <CreateUserForm onSubmit={submitCreateUser} /> }
      <RenderTable
        datas={murid}
        activateUser={activateUser}
        deleteUser={deleteUser}
      />
    </>
  );
}

function RenderTable({ datas, activateUser, deleteUser }) {
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
        {datas.map((val, i) => (
          <tr key={i}>
            <td>{i + 1}</td>
            <td>{val.username}</td>
            <td>{val.is_active === "1" ? "aktif" : "non-aktif"}</td>
            <td>
              <Button
                onClick={() => activateUser(val.id, (val.is_active !== '1'))}
                variant={val.is_active ? "success" : "warning text-white"}
                size="sm"
                className="me-2"
              >
                {val.is_active === '1' ? "Deactivate" : "Activate"}
              </Button>
              <Button
                onClick={() => deleteUser(val.id)}
                variant="danger"
                size="sm"
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

function CreateUserForm({ onSubmit }) {
  return (
    <Form onSubmit={onSubmit} className="my-4">
      <Form.Control type="text" name="username" placeholder="Nama User" className="mb-2" />
      <Form.Control type="email" name="email" placeholder="Email User" className="mb-2" />
      <Form.Control type="password" name="password" placeholder="Password" className="mb-2" />
      <Form.Check label="Aktifkan User?" type="checkbox" name="is_active" value={1} id="is_active" className="mb-2" />
      <Button type="submit">Tambah User</Button>
    </Form>
  );
}
