import axios from "axios";
import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Link, useNavigate, useParams } from "react-router-dom";
import Cookies from 'js-cookie';

export default function AddTransaction() {
  const navigate = useNavigate();
  const isAuthenticated = !!Cookies.get('auth');
  const usId =  Cookies.get('userId');

  useEffect(() => {
    loadTransaction();
    if (!isAuthenticated) {
      navigate('/'); 
    }
  }, []);

  const [transaction, setTransaction] = useState({
    description: "",
    date: "",
    amount: "",
    mode: "",
    borrowedFromMe: false,
    borrowedByMe: false,
    status: "",
  });

  const { transid } = useParams();
  const { 
  description,
  date,
  amount,
  mode,
  borrowedFromMe,
  borrowedByMe,
  status } = transaction;

  
  const onInputChange = (e) => {
    setTransaction({ ...transaction, [e.target.name]: e.target.value });
  };

  const onCheck = (e)=>{
    setTransaction({ ...transaction, [e.target.name]: e.target.checked });
  }

  const loadTransaction = async () => {
    const result = await axios.get(`http://localhost:8080/v1/transactions/${transid}`);
    setTransaction(result.data);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try{
      console.log(transaction);
      await axios.post(`http://localhost:8080/v1/transactions/${transid}`, transaction);
      //alert("transaction added successfully");
      navigate(`/viewAllTransactions/`);
    }catch(err){
      alert("Failed");
    }
    
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Add Transactions</h2>

          <Form onSubmit={(e) => onSubmit(e)}>

            <Form.Group as={Col} controlId="formGridDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" placeholder="Enter Description" name="description"
                  value={description}
                  onChange={(e) => onInputChange(e)}/>
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridAmount">
                <Form.Label>Amount</Form.Label>
                <Form.Control type="number" placeholder="Amount" name="amount"
                value={amount}
                onChange={(e) => onInputChange(e)}/>
              </Form.Group>

              <Form.Group as={Col} controlId="dob">
                <Form.Label>Select Date</Form.Label>
                <Form.Control type="date"  placeholder="Date of Birth" name="date"
                value={date}
                onChange={(e) => onInputChange(e)}/>
              </Form.Group>
            </Row>

            
            <Row className="mb-3">
              
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Mode</Form.Label>
                <Form.Select  name="mode"
                value={mode}
                onChange={(e) => onInputChange(e)} required>
                  <option value="">Select Mode</option>
                  <option>Credit Card</option>
                  <option>Debit Card</option>
                  <option>UPI</option>
                  <option>By Hand</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Status</Form.Label>
                <Form.Select  name="status"
                  value={status}
                onChange={(e) => onInputChange(e)} required>
                  <option value="">Select Status</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                </Form.Select>
              </Form.Group>

            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} className="mb-3" id="formGridCheckbox">
                <Form.Check type="checkbox" label="Borrowed From Me" name="borrowedFromMe"
                checked={borrowedFromMe} defaultValue={borrowedFromMe}
                onChange={(e) => onCheck(e)}/>
              </Form.Group>

              <Form.Group as={Col} className="mb-3" id="formGridCheckbox">
                <Form.Check type="checkbox" label="Borrowed By Me" name="borrowedByMe"
                checked={borrowedByMe} 
                onChange={(e) => onCheck(e)}/>
              </Form.Group>
            </Row>



            <Button variant="primary" type="submit">
              Submit
            </Button>
            <Link className="btn btn-outline-danger mx-2" to={-1}>
              Cancel
            </Link>
          </Form>
        </div>
      </div>
    </div>
  );
}
