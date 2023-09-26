import axios from "axios";
import React, { useEffect,useState } from "react";
import { Link, useParams,useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

export default function ViewTransaction() {

  const [transaction, setTransaction] = useState({
    id: "",
    description: "",
    date: "",
    amount: "",
    mode: "",
    repaydate:"",
    borrowedFromMe: "",
    borrowedByMe: "",
    status: "",
  });

  const { transid } = useParams();

  useEffect(() => {
    loadTransaction();
  }, []);

  const isAuthenticated = !!Cookies.get('auth');
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate('/'); 
    return null; // Return null to prevent rendering anything else
  }

  

  const loadTransaction = async () => {
    
    const result = await axios.get(`http://localhost:8080/v1/transactions/${transid}`);
    setTransaction(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Transaction Details</h2>

          <div className="card">
            <div className="card-header">
              <b>Details of Transaction id :</b>{transaction.id}
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Description:</b>
                  {transaction.description}
                </li>
                <li className="list-group-item">
                  <b>Amount:</b>
                  {transaction.amount}
                </li>
                <li className="list-group-item">
                  <b>Date:</b>
                  {transaction.date}
                </li>
                <li className="list-group-item">
                  <b>Mode:</b>
                  {transaction.mode}
                </li>
                <li className="list-group-item">
                  <b>Status:</b>
                  {transaction.status}
                </li>

                {transaction.borrowedByMe ? (
                  <li className="list-group-item">
                  <b>Borrowed By Me</b>
                </li>
                ):(
                  <li className="list-group-item">
                  <b>Borrowed From Me</b>
                </li>
                )}
              </ul>
            </div>
          </div>
          <Link
            className="btn btn-primary mx-2"
            to={`/edittransaction/${transaction.id}`}>
            Edit
          </Link>
          <Link className="btn btn-primary my-2" to={-1}>
            Go Back
          </Link>
        </div>
      </div>
    </div>
  );
}
