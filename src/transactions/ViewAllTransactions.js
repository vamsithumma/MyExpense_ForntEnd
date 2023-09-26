import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';


export default function ViewAllTransactions({ ...rest }) {
   
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (role!="admin") {
      navigate(-1); 
    }
    if (!isAuthenticated ) {
        navigate('/'); 
    }
    loadTransactions();
  }, []);

  const isAuthenticated = !!Cookies.get('auth');
  const navigate = useNavigate();
  const role=Cookies.get('role');
  

  const loadTransactions = async () => {
    const result = await axios.get("http://localhost:8080/v1/transactions");
    //console.log(result);
    setTransactions(result.data);
  };

  const deletetransaction = async (transid) => {
    await axios.get(`http://localhost:8080/v1/transactions/delete/${transid}`);
    loadTransactions();
  };

  return (
    <div className="container">
      <div className="py-4">
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">S.No</th>
              <th scope="col">User Id</th>
              <th scope="col">Trans Id</th>
              <th scope="col">Description</th>
              <th scope="col">Amount</th>
              <th scope="col">Date</th>
              <th scope="col">Mode</th>
              <th scope="col">Status</th>
              <th scope="col">Credit/Debit</th>
              <th scope="col">Action</th>
              
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr>
                <th scope="row" key={index}>
                  {index + 1}
                </th>
                <td>{transaction.user.id}</td>
                <td>{transaction.id}</td>
                <td>{transaction.description}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.date}</td>
                <td>{transaction.mode}</td>
                <td>{transaction.status}</td>
                {transaction.borrowedByMe ? (<td>Credit</td>):(<td>Debit</td>)}
                <td>
                  <Link
                    className="btn btn-primary mx-2"
                    to={`/viewtransaction/${transaction.id}`}
                  >
                    View
                  </Link>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/edittransaction/${transaction.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deletetransaction(transaction.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
