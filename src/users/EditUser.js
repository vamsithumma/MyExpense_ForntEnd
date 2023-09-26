import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Cookies from 'js-cookie';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export default function EditUser() {
  const navigate = useNavigate();
  const isAuthenticated = !!Cookies.get('auth');
  const usr_role=Cookies.get('role');
  const { id } = useParams();
  //const id= Cookies.get('userId');
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    role:"",
  });

  const { name, username, email, password, role } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };


  useEffect(() => {
    loadUser();
    if (!isAuthenticated) {
      navigate('/'); 
    }
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    try{
      await axios.put(`http://localhost:8080/users/${id}`, user);
      navigate("/");
    }catch(err){
      console.log(err);
      alert("Email already exists",err);
    }
    
  };

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8080/users/${id}`);
    setUser(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 offset-md-2 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit User</h2>

          <Form onSubmit={(e) => onSubmit(e)}>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                <Form.Label column sm="2">
                  Name
                </Form.Label>
                <Col sm="10">
                <Form.Control type="text" placeholder="Name" name="name"
                  value={name}
                  onChange={(e) => onInputChange(e)}/>
                </Col>
              </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
              <Form.Label column sm="2">
                User Name
              </Form.Label>
              <Col sm="10">
              <Form.Control type="text" placeholder="User Name" name="username"
                value={username}
                onChange={(e) => onInputChange(e)}/>
              </Col>
            </Form.Group>


            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
              <Form.Label column sm="2">
                Email
              </Form.Label>
              <Col sm="10">
              <Form.Control type="email" placeholder="name@example.com" name="email"
                value={email}
                onChange={(e) => onInputChange(e)}/>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
              <Form.Label column sm="2">
                Password
              </Form.Label>
              <Col sm="10">
                <Form.Control type="password" placeholder="Password" name="password"
                value={password}
                onChange={(e) => onInputChange(e)}/>
              </Col>
            </Form.Group>

            {usr_role=="admin" ? (
              <div>
                <Form.Label column sm="3">Current Role : {role}</Form.Label>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                  
                    <Form.Label column sm="2">Role</Form.Label>
                    <Col sm="10">
                      <Form.Select name="role"
                        value={role}
                        onChange={(e) => onInputChange(e)} >
                        <option value="">Select Role</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                      </Form.Select>
                    </Col>
                  </Form.Group>
              </div>

            ):(<></>)}
            

            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to={-1}>
              Cancel
            </Link>
          </Form>

          
        </div>
      </div>
    </div>
  );
}
