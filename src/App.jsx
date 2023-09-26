import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
//import AllUsers from "./pages/AllUsers";
import AllUsers from "./users/AllUsers";
import React, { Component, useState, useEffect }  from 'react';
import { BrowserRouter as Router, Route,Routes,   Link , useNavigate, Navigate} from 'react-router-dom';
import AddUser from "./users/AddUser";
import EditUser from "./users/EditUser";
import ViewUser from "./users/ViewUser";
import Cookies from 'js-cookie';
import AddTransaction from "./transactions/AddTransaction";
import ViewAllTransactions from "./transactions/ViewAllTransactions";
import ViewTransaction from "./transactions/ViewTransaction";
import EditTransaction from "./transactions/EditTransaction";
import ViewTransactionsByUser from "./transactions/ViewTransactionsByUser";
import PrivateRoutes from "./routes/PrivateRoute";


const ProtectedPage = ({ ...rest }) => {
  const isAuthenticated = !!Cookies.get('auth');
  const navigate = useNavigate();
  const handleLogout = () => { 
    Cookies.remove('auth');
    navigate('/login'); 
  };

  if (!isAuthenticated) {
    navigate('/login'); 
    return null; // Return null to prevent rendering anything else
  }

  return (
    <div>
      <h1 style={{ fontSize: '24px', color: 'blue' }}>Hello, World!</h1>
      
    </div>
  );
};





function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
    const checkUserToken = () => {
        const userToken = Cookies.get('token');
        //console.log("token:",userToken);
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

  const Auth = ({ children }) => {
    if (!!Cookies.get("auth")) {
      return children;
    }
    return <Navigate to="/" replace/>;
  };



  return (
    <div className="App">
      <Router>
        <Navbar />

        <Routes>
              <Route path="/protected/*" element={<ProtectedPage />} />
              <Route  path="/" element={<Login />} />
              <Route path="/adduser/*" element={<AddUser />} />
              <Route element={<PrivateRoutes />}> 
                <Route  path="/allusers/*" element={<AllUsers/>} /> 
                <Route  path="/edituser/:id" element={<EditUser />} />
                <Route  path="/viewuser/:id" element={<ViewUser />} />
                <Route  path="/addtransaction/*" element={<AddTransaction />} />
                <Route  path="/viewAllTransactions/*" element={<ViewAllTransactions />} />
                <Route  path="/viewtransactionsbyuser/" element={<ViewTransactionsByUser />} />
                <Route path="/viewtransaction/:transid" element={<ViewTransaction/>} />
                <Route  path="/edittransaction/:transid" element={<EditTransaction />} />
              </Route>
              
              
        </Routes>
      </Router>
    </div>
  );
}

export default App;
