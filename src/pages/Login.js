import axios from "axios";
//import { Alert } from "bootstrap";
import React, { useState, useEffect } from "react";
//import { Alert } from 'react-alert';
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

export default function Login() {
  const isAuthenticated = !!Cookies.get('auth');
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated ) {
        navigate(-1); 
    }
  }, []);

  
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  
  const { username, password} = user;
  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  

  const onSubmit = async (e) => {
    e.preventDefault();
    try{
      const rs = await axios.get(`http://localhost:8080/userlogin/${user.username}&${user.password}`);
      

      var name=rs.data.name;
      var role= rs.data.role;
      var userId=Number(rs.data.id);
      if (username === rs.data.username && password === rs.data.password) { 
        const userData = {
          name,
          username,
          password,
          role,
          userId,
        };
        const expirationTime = new Date(new Date().getTime() + 600000); 
        //Cookies.clear();
        Cookies.set('auth', JSON.stringify(userData), { expires: expirationTime });
        Cookies.set('userId', JSON.stringify(userId), { expires: expirationTime });
        Cookies.set('role', role, { expires: expirationTime });
        Cookies.set("token", JSON.stringify(true));
        //navigate('/protected');
        //navigate(`/viewuser/${rs.data.id}`);
        navigate(`/viewtransactionsbyuser/`);
      }else {
        alert("User Not Authenticated ");
      }
    }catch(err){
      alert("User Not Found");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">LOGIN</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            
            <div className="mb-3">
              <label htmlFor="Username" className="form-label">
                Username
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your username"
                name="username"
                value={username}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                name="password"
                value={password}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Login
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/">
              Cancel
            </Link>
            
          </form>
          <label htmlFor="Password" className="form-label">
                Don't have account? 
              </label>
              <Link  to="/adduser">
                Sign Up.
              </Link>
            
        </div>
      </div>
    </div>
  );
}
