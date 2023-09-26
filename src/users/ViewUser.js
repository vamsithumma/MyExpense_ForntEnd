import axios from "axios";
import React, { useEffect,useState } from "react";
import { Link, useParams,useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

export default function ViewUser() {
  //const id= Cookies.get('userId');

  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
  });

  const { id } = useParams();
  useEffect(() => {
    loadUser();
  }, []);

  const isAuthenticated = !!Cookies.get('auth');
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate('/'); 
    return null; // Return null to prevent rendering anything else
  }

  

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8080/users/${id}`);
    setUser(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">User Details</h2>

          <div className="card">
            <div className="card-header">
              Details of user id : {user.id}
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Name:</b>
                  {user.name}
                </li>
                <li className="list-group-item">
                  <b>UserName:</b>
                  {user.username}
                </li>
                <li className="list-group-item">
                  <b>Email:</b>
                  {user.email}
                </li>
              </ul>
            </div>
          </div>
          <Link
            className="btn btn-primary mx-2"
                    to={`/edituser/${id}`}>
            Edit
          </Link>
          <Link className="btn btn-danger mx-2" to={-1}>
            Go Back
          </Link>
        </div>
      </div>
    </div>
  );
}
