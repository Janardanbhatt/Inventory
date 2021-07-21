import React, { useState,useEffect  } from "react";
import { Link, Redirect , useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AddComponent () {

		const [itemname, setItemName] = useState("");
		const [itemtype, setItemType] = useState("");
		const [tin, setTin] = useState("");
	    const [quantity, setQuantity] = useState("");
	    const [price, setPrice] = useState("");
	    const [validated, setValidated] = useState(false);
		const history = useHistory();
	 
	function handleSubmit(event) {
    	event.preventDefault();
    	const form = event.currentTarget;
		    if (form.checkValidity() === false) {
		      event.preventDefault();
		      event.stopPropagation();
		    }else{
		    	let itemDetails = {
		    		'itemname':itemname,
		    		'itemtype':itemtype,
		    		'tin':tin,
		    		'quantity':quantity,
		    		'price':price
		    	};



		    	fetch('http://localhost:3000/posts',{
		    		method:'POST',
		    		body : JSON.stringify(itemDetails),
		    		headers: {
    					'Content-type': 'application/json; charset=UTF-8',
  					},
		    	}).then(response => {return response.json()})
		    	.then(success=>{if(success){
		    		 history.push('/dashboard')			
		    	}})
		    }
		 setValidated(true);
  	}


			return(
					<Form className='Add' noValidate validated={validated} onSubmit={handleSubmit}>
						  <Form.Group size="sm" controlId="itemname">
				          	<Form.Label>Item name</Form.Label>
						     <Form.Control
						            autoFocus
						            type="text"
						            value={itemname}
						            onChange={(e) => setItemName(e.target.value)}
						  	        required 
				          	/>
				          	<Form.Control.Feedback type="invalid">
            					Please Provide Itemname.
          				    </Form.Control.Feedback>
          				   </Form.Group>

          				   <Form.Group size="sm" controlId="itemtype">
				          	<Form.Label>Item type</Form.Label>
						     <Form.Control
						            type="text"
						            value={itemtype}
						            onChange={(e) => setItemType(e.target.value)}
						  	        required 
				          	/>
				          	<Form.Control.Feedback type="invalid">
            					Please Provide Item type.
          				    </Form.Control.Feedback>
          				   </Form.Group>



						  <Form.Group size="sm" controlId="tin">
				          	<Form.Label>Tin number</Form.Label>
						     <Form.Control
						            type="text"
						            value={tin}
						            onChange={(e) => setTin(e.target.value)}
						  	        required 
				          	/>
				          	<Form.Control.Feedback type="invalid">
            					Please Provide Tin number.
          				    </Form.Control.Feedback>
          				   </Form.Group>

						  <Form.Group size="sm" controlId="quantity">
						     <Form.Label>Quantity</Form.Label>
						   		<Form.Control
						            type="text"
						            value={quantity}
						            onChange={(e) => setQuantity(e.target.value)}
						            required 
				          		/>
				          	<Form.Control.Feedback type="invalid">
            					Please Provide Quantity.
          					</Form.Control.Feedback>
				          	</Form.Group>

						 	<Form.Group size="sm" controlId="price">
						     <Form.Label>Price</Form.Label>
						    	<Form.Control
						            type="text"
						            value={price}
						            onChange={(e) => setPrice(e.target.value)}
						            required 
				          		/>
			          		<Form.Control.Feedback type="invalid">
            					Please Provide Price.
          					</Form.Control.Feedback>
						    </Form.Group>

						  	<Button block size="lg" type="submit">
				          		save
				        	</Button>
					</Form>
				)
}