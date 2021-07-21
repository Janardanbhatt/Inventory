import React, { useState,useEffect  } from "react";
import { Link, Redirect,useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function SignUpComponent(){

	const [firstname, setFirstName] = useState("");
	const [lastname, setLastName] = useState("");
	const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [address2, setAddress2] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipcode, setZip] = useState("");
    const [dob, setDob] = useState("");
    const [validated, setValidated] = useState(false);
    const history = useHistory();

    

    function handleSubmit(event) {
    	event.preventDefault();
    	const form = event.currentTarget;
		    if (form.checkValidity() === false) {
		      event.preventDefault();
		      event.stopPropagation();
		    }else{
		    	let userDetails = {
		    		'firstname':firstname,
		    		'lastname':lastname,
		    		'email':email,
		    		'password':password,
		    		'address':address,
		    		'address2':address2,
		    		'city':city,
		    		'state':state,
		    		'zipcode':zipcode,
		    		'dob':dob
		    	};



		    	fetch('http://localhost:3000/profile',{
		    		method:'POST',
		    		body : JSON.stringify(userDetails),
		    		headers: {
    					'Content-type': 'application/json; charset=UTF-8',
  					},
		    	}).then(response => {return response.json()})
		    	.then(success=>{
		    		if(success){
		    			history.push('/login');
		    		}


		    	})
		    }
		 setValidated(true);
  	}




			return(				      
  					<Form noValidate validated={validated} onSubmit={handleSubmit}>
						  <Form.Group size="sm" controlId="firstname">
				          	<Form.Label>First name</Form.Label>
						     <Form.Control
						            autoFocus
						            type="text"
						            value={firstname}
						            onChange={(e) => setFirstName(e.target.value)}
						  	        required 
				          	/>
				          	<Form.Control.Feedback type="invalid">
            					Please Provide Firstname.
          				    </Form.Control.Feedback>
          				   </Form.Group>

          				   <Form.Group size="sm" controlId="lastname">
				          	<Form.Label>Last name</Form.Label>
						     <Form.Control
						            type="text"
						            value={lastname}
						            onChange={(e) => setLastName(e.target.value)}
						  	        required 
				          	/>
				          	<Form.Control.Feedback type="invalid">
            					Please Provide Lastname.
          				    </Form.Control.Feedback>
          				   </Form.Group>



						  <Form.Group size="sm" controlId="email">
				          	<Form.Label>Email</Form.Label>
						     <Form.Control
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

						    <Form.Group size="sm" controlId="dob">
                            	<Form.Label>Dob</Form.Label>
                            	<Form.Control 
                            			type="date" 
                            			value={dob}
                        			    onChange={(e) => setDob(e.target.value)}
						                required
                            	/>
                            	<Form.Control.Feedback type="invalid">
            						Please Provide Date of birth.
          						</Form.Control.Feedback>
                        	</Form.Group>


						  <Form.Group size="sm" controlId="address">
						     <Form.Label>Address</Form.Label>
						   		<Form.Control
						            type="text"
						            value={address}
						            onChange={(e) => setAddress(e.target.value)}
						            required 
				          		/>
				          	<Form.Control.Feedback type="invalid">
            					Please Provide Address.
          					</Form.Control.Feedback>
				          	</Form.Group>

						 	<Form.Group size="sm" controlId="address 2">
						     <Form.Label>Address 2</Form.Label>
						    	<Form.Control
						            type="text"
						            value={address2}
						            onChange={(e) => setAddress2(e.target.value)}
						            required 
				          		/>
			          		<Form.Control.Feedback type="invalid">
            					Please Provide Secondary Address.
          					</Form.Control.Feedback>
						    </Form.Group>

						 	<Form.Group size="sm" controlId="city">
							      <Form.Label>City</Form.Label>
							      <Form.Control
						            type="text"
						            value={city}
						            onChange={(e) => setCity(e.target.value)}
						            required 
				          		/>
				          	<Form.Control.Feedback type="invalid">
            					Please Provide City.
          					</Form.Control.Feedback>
							 </Form.Group>

						   <Form.Group size="sm" controlId="state">
						      <Form.Label>State</Form.Label>
  						      	<Form.Control
						            type="text"
						            value={state}
						            onChange={(e) => setState(e.target.value)}
						            required 
				          		/>
				          	<Form.Control.Feedback type="invalid">
            					Please Provide State.
          					</Form.Control.Feedback>
							</Form.Group>

						     <Form.Group size="sm" controlId="zip">
						      <Form.Label>Zip</Form.Label>
						      	<Form.Control
						            type="text"
						            value={zipcode}
						            onChange={(e) => setZip(e.target.value)}
						            required 
				          		/>
			          		<Form.Control.Feedback type="invalid">
            					Please Provide Zipcode.
          					</Form.Control.Feedback>
						     </Form.Group>

						  	<Button block size="lg" type="submit">
				          		Sign up
				        	</Button>
				        	<button type="button" className="btn btn-link" onClick={(e)=>history.push('/login')}>Alread have account!</button>
					</Form>


  				)

}
