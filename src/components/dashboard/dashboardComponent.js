import React, { Component  } from "react";
import { Link, Redirect } from "react-router-dom";
import SLUGS from '../../resources/slugs';
import Table from 'react-bootstrap/Table';
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';

class DashboardComponent extends  Component{

		constructor(){
			super();
			this.state={
				postData:[],
				showPopup:false,
				showBdayWishpopup:false
			}
		}

		formatDate = (date) => {
 			   var d = new Date(date),
       		   month = '' + (d.getMonth() + 1),
        	   day = '' + d.getDate(),
        	   year = d.getFullYear();

    		   if (month.length < 2) month = '0' + month;
    		   if (day.length < 2) day = '0' + day;

    			return [year, month, day].join('-');
		}


		componentDidMount(){
			// Get All Posts//

			fetch('http://localhost:3000/profile',{
		    	}).then(response => {return response.json()})
		    	.then(success=>{
		    		if(success){
		    			if(this.formatDate(success.dob)===this.formatDate(new Date())){
		    			this.setState({
		    				showBdayWishpopup:true
		    			});
		    		}else{
		    			this.setState({
		    				showBdayWishpopup:false
		    			});
		    		}
		    		}
		    	})

			fetch('http://localhost:3000/posts',{
		    		method:'GET',
		    	}).then((response) => {
		    		return response.json()
		    	}).then((data)=>{
		    		console.log(data);
		    		this.setState({postData : data})
		    	})
		}

		deletePopup = (id) => {
			localStorage.setItem('deleteId',id);
			this.setState({showPopup : true});
		}		

		deletePost = () => {
			// Delete Post //

			fetch(`http://localhost:3000/posts/${JSON.parse(localStorage.getItem("deleteId"))}`,{
		    		method:'Delete',
		    	}).then((response) => {
		    		return response.json()
		    	}).then((data)=>{
		    		console.log(data);
		    		this.setState({showPopup:false})
		    		localStorage.removeItem('deleteId');
		    		//this.setState({postData : data})
		    	})
		}


	render(){
		return (
			<>

			<Button variant = "primary" 
     				onClick =  {(e)=>this.props.history.push({
                      							  pathname: "/additem",
                    					})}
     		>
     		Add Post
     		</Button>

			<Table striped bordered hover>
			  <thead>
			    <tr>
			      <th>#</th>
			      <th>Item name</th>
			      <th>Item type</th>
			      <th>Tin number</th>
			      <th>Quantity</th>
			      <th>Price</th>
			      <th>Action</th>
			    </tr>
			  </thead>
			  <tbody>
			  	{this.state.postData.map((item,index)=>
				    <tr key={index}>
				     	<td>{item.id}</td>
				     	<td>{item.itemname}</td>
				     	<td>{item.itemtype}</td>
				     	<td>{item.tin}</td>
				     	<td>{item.quantity}</td>
				     	<td>{item.price}</td>
				     	<td>
				     		<Button variant = "success" 
				     				onClick =  {(e)=>
				     					this.props.history.push({
                      							  pathname: `/edititem/${item.id }`,
                    					})} 
				     		>
				     		Edit
				     		</Button>
				     		<Button variant = "danger"
				     				onClick =  {((e)=>this.deletePopup(item.id))}
				     		>
				     		Delete
				     		</Button>
				     	</td>
				    </tr>
				)}
			  </tbody>
			</Table>
			{this.state.showPopup && 
			<Modal.Dialog>
				  <Modal.Header closeButton onClick ={(e)=>this.setState({showPopup:false})}>
				    <Modal.Title>Delete item</Modal.Title>
				  </Modal.Header>

				  <Modal.Body>
				    <p>Are you sure, you want to delete this item?</p>
				  </Modal.Body>

				  <Modal.Footer>
				    <Button variant="secondary" onClick = {(e)=>{
				    											 localStorage.removeItem('deleteId');
				    											 this.setState({showPopup:false});
				    											}}>No</Button>
				    <Button variant="primary" onClick={(e)=>this.deletePost()}>Yes</Button>
				  </Modal.Footer>
			</Modal.Dialog>
			}

			{this.state.showBdayWishpopup && 
			<Modal.Dialog>
				  <Modal.Header closeButton onClick ={(e)=>this.setState({showBdayWishpopup:false})}>
				    <Modal.Title>Birthday Wish</Modal.Title>
				  </Modal.Header>

				  <Modal.Body>
				    <p>Many Many Happy returns of the day...</p>
				  </Modal.Body>

				  <Modal.Footer>
				    <Button variant="primary" onClick={(e)=>this.setState({showBdayWishpopup:false})}>Ok</Button>
				  </Modal.Footer>
			</Modal.Dialog>
			}

			</>
			)
	}


}

export default DashboardComponent;