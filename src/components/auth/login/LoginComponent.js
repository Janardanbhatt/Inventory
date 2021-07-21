import React, { useState  } from "react";
import { Link, Redirect,useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';

import "./Login.css";

  export default function LoginComponent(){

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [validated, setValidated] = useState(false);
  const history = useHistory();

  	function handleSubmit(event) {
    	event.preventDefault();
    	const form = event.currentTarget;
		    if (form.checkValidity() === false) {
		      event.preventDefault();
		      event.stopPropagation();
		    }else{
		    	fetch('http://localhost:3000/profile',{
		    	}).then(response => {return response.json()})
		    	.then(success=>{
		    		console.log(success);
		    		//return false;
		    			if(email==success.email && password==success.password){
		    				setError(false)
		    				localStorage.setItem('login',true);
		    				history.push('/dashboard');
		    			}else{
		    				setError(true);
		    			}

		    	})
		    }
		 setValidated(true);
  	}
  	return(				      
  			<div className="Login">
  				<Form noValidate validated={validated} onSubmit={handleSubmit}>
				        <Form.Group size="sm" controlId="email">
				          <Form.Label>Email</Form.Label>
				          <Form.Control
				            autoFocus
				            type="email"
				            value={email}
				            onChange={(e) => setEmail(e.target.value)}
				            required 
				          />
				          <Form.Control.Feedback type="invalid">
            					Please Provide Email.
          				  </Form.Control.Feedback>
				        </Form.Group>
				        <Form.Group size="sm" controlId="password">
				          <Form.Label>Password</Form.Label>
				          <Form.Control
				            type="password"
				            value={password}
				            onChange={(e) => setPassword(e.target.value)}
				            required 
				          />
				           <Form.Control.Feedback type="invalid">
            					Please Provide Password.
          					</Form.Control.Feedback>
				        </Form.Group>
				        <Button block size="lg" type="submit">
				          Login
				        </Button>
				        <button type="button" className="btn btn-link" onClick={(e)=>history.push('/signup')}>Sign up</button>

				      </Form>
				      {error && <div className="alert alert-danger" role="alert">
	  						Invalid Credentails!
						</div>
					  }

				</div>
  			);
 
}

