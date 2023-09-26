import React, { useState ,useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import isAuthenticated from '../Authenticated.js';


export default function Navbar() {
  //window.location.reload(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
    const checkUserToken = () => {
        const userToken = Cookies.get('token');
        console.log("token:",userToken);
        if (!userToken || userToken === 'undefined') {
            //console.log("token:",userToken);
            setIsLoggedIn(false);
        }else 
          setIsLoggedIn(true);
    }

    useEffect(() => {
        checkUserToken();
        //console.log(isLoggedIn);
    }, [isLoggedIn]);
 
  const role= Cookies.get('role');
  const token = Cookies.get('token');
  const navigate = useNavigate();
  const userid =Cookies.get('userId');
  const user = Cookies.get('auth');
  
  //console.log(userid,role);
  const handleLogout = () => { 
    Cookies.remove('auth');
    Cookies.remove('userId');
    Cookies.remove('role');
    Cookies.remove('token');
    console.clear()
    navigate('/'); 
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Expenses Manager
          </Link>
         
          {token ? (
          <div class="d-flex flex-row bd-highlight mb-3">      
              
                  <DropdownButton  id="dropdown-basic-button" title="User">
                    {role == "admin" ? (
                      <div>
                          <Dropdown.Item href={`/viewuser/${userid}`} >My Profile</Dropdown.Item>
                          <Dropdown.Item href="/allusers" >All Users</Dropdown.Item>
                          <Dropdown.Item href="/adduser">Add User</Dropdown.Item>
                      </div>
                    ):
                    (<Dropdown.Item href={`/viewuser/${userid}`} >My Profile</Dropdown.Item>)}
                    
                  </DropdownButton>
                
              
                  <DropdownButton  id="dropdown-basic-button" title="Transactions">
                      <Dropdown.Item href="/viewtransactionsbyuser">My Transactions</Dropdown.Item>
                      {role == "admin" ? (<Dropdown.Item href="/viewAllTransactions">All Transactions</Dropdown.Item>):
                      (<></>)}
                      <Dropdown.Item href="/addtransaction">Add Transaction</Dropdown.Item>
                  </DropdownButton>
            
              <Dropdown class="border border-white rounded" as={ButtonGroup} >
                <Button  variant="primary"  onClick={handleLogout}>Logout</Button>
                <Dropdown.Toggle split variant="primary" id="dropdown-split-variants-Primary" />
                <Dropdown.Menu>
                  <Dropdown.Item href="/">Login</Dropdown.Item>
                  <Dropdown.Item href="/">Admin Login</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
             
          </div>) :
                (<Link  className="btn btn-outline-light"  to='/'>Login</Link>) }
        </div>
      </nav>
    </div>
  );
}
